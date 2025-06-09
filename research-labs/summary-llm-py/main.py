from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse


# from scripts.python import summarize
from summarize import summarize_pdf  # if you defined that function
import os

app = FastAPI()

@app.websocket("/ws/summarize")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            pdf_path = await websocket.receive_text()
            print("path")
            print(pdf_path)
            if not os.path.isfile(pdf_path):
                await websocket.send_text("ERROR: File not found.")
                continue
            try:
                summaries = summarize_pdf(pdf_path)
                for idx, chunk in enumerate(summaries, 1):
                    await websocket.send_text(f"Part {idx}:\n{chunk}")
                    print(f"{chunk}")
                    print(f"{idx}")
                await websocket.send_text("DONE")
            except Exception as e:
                await websocket.send_text(f"ERROR: {str(e)}")
    except WebSocketDisconnect:
        print("WebSocket disconnected")
