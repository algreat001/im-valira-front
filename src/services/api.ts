import { config } from "config";
import { RoleDto, UserDto } from "interfaces/ext";
import { Token } from "interfaces/profile";
import { request } from "services/request";

export const signup = async (user: UserDto) => await request({ api: config.api.auth, query: "signup", data: user });

export const saveProfile = async (user: UserDto): Promise<UserDto> =>
  (await request({ api: config.api.user, query: "profile", method: "PUT", data: user })) as UserDto;

export const signin = async (user: UserDto): Promise<Token> =>
  (await request({ api: config.api.auth, query: "signin", data: user })) as Token;

export const loadProfile = async (): Promise<UserDto> =>
  (await request({ api: config.api.user, query: "profile" })) as UserDto;

export const loadRoles = async (): Promise<RoleDto[]> =>
  (await request({ api: config.api.role, query: "list" })) as RoleDto[];

