"use client"

import { useCallback } from "react";

export function useSessionStorage<T>(key: string) {

  const readValue = useCallback(() => {
    try {
      if (typeof window === "undefined") return undefined;
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error: unknown) {
      console.error(`Error reading then key data : ${key} `, error);
    }
  }, [key]);

  const setValue = (Value: T) => {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(Value));
      }
    } catch (error) {
      console.error(`Error setting Value of the key : ${key} `, error);
    }
  }

  const deleteValue = () => {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing item from localStorage: ${error}`);
    }
  };

  return {
    readValue,
    setValue,
    deleteValue
  };
}


export default useSessionStorage;
