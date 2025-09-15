import { tournamentTypeDefs } from "./tournement/tournement.schema"
import { matchRoomTypeDefs } from "./tournement/match-room.schema";
import { piWardTypeDefs } from "./tournement/pi-ward.schema"

export const typeDefs = [matchRoomTypeDefs, tournamentTypeDefs, piWardTypeDefs];
