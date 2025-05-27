import { prisma } from "../utils/client";
import {
  IResponse,
  THealthFacility,
  CreateHealthFacilityDto,
} from "../utils/interfaces/common";
import AppError from "../utils/error";

export class HealthFacilityService {
  public static async getAllHealthFacilities(): Promise<
    IResponse<THealthFacility[]>
  > {
    try {
      const facilities = await prisma.healthFacility.findMany({
        include: { ambulances: true },
      });
      return {
        statusCode: 200,
        message: "Health facilities fetched successfully",
        data: facilities,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async getHealthFacility(
    id: string,
  ): Promise<IResponse<THealthFacility>> {
    try {
      const facility = await prisma.healthFacility.findUnique({
        where: { id },
        include: { ambulances: true },
      });
      if (!facility) {
        throw new AppError("Health facility not found", 404);
      }
      return {
        statusCode: 200,
        message: "Health facility fetched successfully",
        data: facility,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async createHealthFacility(
    data: CreateHealthFacilityDto,
  ): Promise<IResponse<THealthFacility>> {
    try {
      const facility = await prisma.healthFacility.create({
        data: {
          name: data.name,
          location: data.location,
          category: data.category,
          lat: data.lat,
          lng: data.lng,
          address: data.address,
          phoneNumber: data.phoneNumber,
          availableAmbulances: data.availableAmbulances,
          photo: typeof data.photo === "string" ? data.photo : undefined,
        },
      });
      return {
        statusCode: 201,
        message: "Health facility created successfully",
        data: facility,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async updateHealthFacility(
    id: string,
    data: Partial<CreateHealthFacilityDto>,
  ): Promise<IResponse<THealthFacility>> {
    try {
      const facility = await prisma.healthFacility.update({
        where: { id },
        data: {
          name: data.name,
          location: data.location,
          category: data.category,
          lat: data.lat,
          lng: data.lng,
          address: data.address,
          phoneNumber: data.phoneNumber,
          availableAmbulances: data.availableAmbulances,
          photo: typeof data.photo === "string" ? data.photo : undefined,
        },
      });
      return {
        statusCode: 200,
        message: "Health facility updated successfully",
        data: facility,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async deleteHealthFacility(
    id: string,
  ): Promise<IResponse<null>> {
    try {
      await prisma.healthFacility.delete({
        where: { id },
      });
      return {
        statusCode: 200,
        message: "Health facility deleted successfully",
        data: null,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }
}
