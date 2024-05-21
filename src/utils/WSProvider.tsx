import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { token_storage } from "../redux/storage";
import { refresh_tokens } from "../redux/apiConfig";
import { SOCKET_URL } from "../redux/API";


interface WSService {
  initializeSocket: () => void;
  emit: (event: string, data?: Record<string, unknown>) => void;
  on: (event: string, cb: (data: any) => void) => void;
  off: (event: string) => void;
  removeListener: (listenerName: string) => void;
  updateAccessToken: () => void;
}

const WSContext = createContext<WSService | undefined>(undefined);

export const WSProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socketAccessToken, setSocketAccessToken] = useState<string | null>(
    null
  );
  const [changedToken, setChangedToken] = useState<boolean>(false);
  const socket = useRef<Socket>();

  useEffect(() => {
    const token = token_storage.getString("socket_access_token") as any;
    setSocketAccessToken(token);
  }, [changedToken]);

  useEffect(() => {
    socket.current = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
      extraHeaders: {
        access_token: socketAccessToken || "",
      },
    });

    if (socketAccessToken) {
      socket.current.on("connect_error", (error) => {
        if (error.message === "Authentication error") {
          console.log("Auth connection error:", error.message);
          refresh_tokens("socket", true, updateAccessToken);
        }
      });
    }

    return () => {
      socket.current?.disconnect();
    };
  }, [socketAccessToken]);

  const emit = (event: string, data: Record<string, unknown> = {}) => {
    socket.current?.emit(event, data);
  };

  const on = (event: string, cb: (data: any) => void) => {
    socket.current?.on(event, cb);
  };

  const off = (event: string) => {
    socket.current?.off(event);
  };

  const removeListener = (listenerName: string) => {
    socket?.current?.removeListener(listenerName);
  };

  const updateAccessToken = () => {
    setChangedToken(!changedToken);
  };

  const socketService: WSService = {
    initializeSocket: () => {},
    emit,
    on,
    off,
    removeListener,
    updateAccessToken,
  };

  return (
    <WSContext.Provider value={socketService}>{children}</WSContext.Provider>
  );
};

export const useWS = (): WSService => {
  const socketService = useContext(WSContext);
  if (!socketService) {
    throw new Error("useWS must be used within a WSProvider");
  }
  return socketService;
};
