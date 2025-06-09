use async_trait::async_trait;
use http::uri::{Parts, Uri};
use log::info;
use pingora::http::ResponseHeader;
use pingora::prelude::*;

#[derive(Clone)]
struct MyGateway;

#[async_trait]
impl ProxyHttp for MyGateway {
    type CTX = ();

    fn new_ctx(&self) -> Self::CTX {}

    async fn upstream_peer(
        &self,
        session: &mut Session,
        _ctx: &mut Self::CTX,
    ) -> Result<Box<HttpPeer>> {
        let req = session.req_header();
        let orig_path = req.uri.path();
        println!("requested uri:{}", req.uri);

        let (peer_addr, new_path) = if orig_path.starts_with("/python/") {
            (("127.0.0.1", 3003), &orig_path["/python".len()..])
        } else if orig_path.starts_with("/rust/") {
            (("rust-backend", 3009), &orig_path["/rust".len()..])
        } else if orig_path.starts_with("/nodejs/") {
            (("node-backend", 3005), &orig_path["/nodejs".len()..])
        } else {
            (("1.1.1.1", 443), orig_path)
        };

        info!("Routing {} to {:?}{}", orig_path, peer_addr, new_path);

        // Rebuild URI with new path
        let mut parts: Parts = req.uri.clone().into_parts();
        parts.path_and_query = Some(
            // If the original URI had query parameters, preserve them
            if let Some(pq) = req.uri.path_and_query() {
                let query = pq.query().unwrap_or("");
                let combined = if query.is_empty() {
                    new_path.to_string()
                } else {
                    format!("{}?{}", new_path, query)
                };
                combined.parse().expect("valid path_and_query")
            } else {
                new_path.parse().expect("valid path_and_query")
            },
        );

        let new_uri = Uri::from_parts(parts).expect("Failed to build URI");

        // Now replace the request URI in session
        session.req_header_mut().set_uri(new_uri);

        // Setup TLS SNI hostname — use IP:port string for simplicity
        let host = format!("{}:{}", peer_addr.0, peer_addr.1);

        let peer = Box::new(HttpPeer::new(peer_addr, false, host));
        Ok(peer)
    }

    async fn response_filter(
        &self,
        _session: &mut Session,
        upstream_response: &mut ResponseHeader,
        _ctx: &mut Self::CTX,
    ) -> Result<()> {
        upstream_response
            .insert_header("Server", "MyGateway")
            .unwrap();
        upstream_response.remove_header("alt-svc");
        Ok(())
    }
}

fn main() {
    env_logger::init();

    let mut server = Server::new(None).expect("Failed to create server");
    server.bootstrap();
    let gateway = MyGateway;
    let mut proxy_service = pingora::proxy::http_proxy_service(&server.configuration, gateway);
    proxy_service.add_tcp("0.0.0.0:6188");
    server.add_service(proxy_service);
    server.run_forever();
}
