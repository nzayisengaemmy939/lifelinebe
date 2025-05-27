import type { $Enums } from "@prisma/client";
import { TsoaResponse } from "tsoa";
export interface IResponse<T> {
  statusCode: number;
  message: string;
  error?: unknown;
  data?: T;
}

export type TUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  photo?: Express.Multer.File | string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  roles?: { id: string; role: string; userId: string }[];
  company?: { id: string; role: string; userId: string; companyId: string };
};

export type RoleT = "ADMIN" | "AMBTEAM" | "DISPATCHER";

export interface IUser extends Omit<TUser, "id" | "createdAt" | "updatedAt"> {}
export interface ILoginResponse
  extends Omit<TUser, "password" | "createdAt" | "updatedAt" | "roles"> {
  token: string;
  roles: $Enums.Role[];
}
export interface ILoginUser extends Pick<IUser, "email" | "password"> {}
export interface ISignUpUser
  extends Pick<
    IUser,
    "email" | "password" | "firstName" | "lastName" | "photo"
  > {
  role: RoleT;
}

export interface CreateUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  photo?: Express.Multer.File | string | null;
  role: RoleT;
}

export type TErrorResponse = TsoaResponse<
  400 | 401 | 500,
  IResponse<{ message: string }>
>;

export type TService = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateServiceDto {
  title: string;
  description: string;
}

export interface IResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export type TFaq = {
  id: string;
  question: string;
  solution: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateFaqDto {
  question: string;
  solution: string;
}

export type TAds = {
  id: string;
  title: string;
  thumbnail: Express.Multer.File | string;
  location: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateAdsDto {
  title: string;
  thumbnail: Express.Multer.File | string;
  location: string;
  description: string;
}

export type TAccidentAlert = {
  id: string;
  title?: string | null;
  description?: string | null;
  location?: string | null;
  latitude: number;
  longitude: number;
  phoneNumber?: string | null;
  email?: string | null;
  status: $Enums.Status;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateAccidentAlertDto {
  title?: string | null;
  description?: string | null;
  location?: string | null;
  latitude: number;
  longitude: number;
  phoneNumber?: string | null;
  email?: string | null;
  status?: $Enums.Status;
}

export type THealthFacility = {
  id: string;
  name: string;
  location: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  phoneNumber: string;
  availableAmbulances: number;
  photo?: Express.Multer.File | string | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateHealthFacilityDto {
  name: string;
  location: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  phoneNumber: string;
  availableAmbulances?: number;
  photo?: Express.Multer.File | string | null;
}

export type TAmbulance = {
  id: string;
  hospitalId: string;
  driverId: string;
  isAvailable: boolean;
  currentLocation: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateAmbulanceDto {
  hospitalId: string;
  driverId: string;
  isAvailable?: boolean;
  currentLocation: string;
  description: string;
}

export interface UpdateAmbulanceDto extends Partial<CreateAmbulanceDto> {}

export type TBlog = {
  id: string;
  title: string;
  thumbnail: Express.Multer.File | string;
  teaser: string;
  description: string;
  category: string;
  likes: number;
  views: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateBlogDto {
  title: string;
  thumbnail: Express.Multer.File | string;
  teaser: string;
  description: string;
  category: string;
  likes?: number;
  views?: number;
  featured: boolean;
}

export type TLikes = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAssign = {
  id: string;
  hospitalId?: string | null;
  ambulanceId: string;
  alertId: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateAssignDto {
  hospitalId?: string | null;
  ambulanceId: string;
  alertId: string;
}
