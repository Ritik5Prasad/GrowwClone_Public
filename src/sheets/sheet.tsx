import { SheetDefinition, registerSheet } from "react-native-actions-sheet";
import CreateWatchlist from "./CreateWatchlistSheet";

registerSheet("create-watchlist", CreateWatchlist);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "create-watchlist": SheetDefinition<{
      payload: {
        message: string;
      };
      returnValue: boolean;
    }>;
  }
}
export {};
