import { prisma } from "../utils/client";
import {
  IResponse,
  TAmbulance,
  CreateAmbulanceDto,
  UpdateAmbulanceDto,
} from "../utils/interfaces/common";
import AppError from "../utils/error";

export class AmbulanceService {
  public static async createAmbulance(
    data: CreateAmbulanceDto,
  ): Promise<IResponse<TAmbulance>> {
    try {
      const ambulance = await prisma.ambulance.create({
        data: {
          ...data,
          isAvailable: data.isAvailable ?? true,
        },
      });
      return {
        statusCode: 201,
        message: "Ambulance created successfully",
        data: ambulance,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async getAmbulance(id: string): Promise<IResponse<TAmbulance>> {
    try {
      const ambulance = await prisma.ambulance.findUnique({
        where: { id },
        include: {
          hospital: true,
          user: true,
        },
      });
      if (!ambulance) {
        throw new AppError("Ambulance not found", 404);
      }
      return {
        statusCode: 200,
        message: "Ambulance fetched successfully",
        data: ambulance,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async getAllAmbulances(): Promise<IResponse<TAmbulance[]>> {
    try {
      const ambulances = await prisma.ambulance.findMany({
        include: {
          hospital: true,
          user: true,
        },
      });
      return {
        statusCode: 200,
        message: "Ambulances fetched successfully",
        data: ambulances,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async getAvailableAmbulances(): Promise<
    IResponse<TAmbulance[]>
  > {
    try {
      const ambulances = await prisma.ambulance.findMany({
        where: { isAvailable: true },
        include: {
          hospital: true,
          user: true,
        },
      });
      return {
        statusCode: 200,
        message: "Available ambulances fetched successfully",
        data: ambulances,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async updateAmbulance(
    id: string,
    data: UpdateAmbulanceDto,
  ): Promise<IResponse<TAmbulance>> {
    console.log("recv data:", data);
    try {
      const updatedAmbulance = await prisma.ambulance.update({
        where: { id },
        data,
      });
      return {
        statusCode: 200,
        message: "Ambulance updated successfully",
        data: updatedAmbulance,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async deleteAmbulance(id: string): Promise<IResponse<null>> {
    try {
      await prisma.ambulance.delete({
        where: { id },
      });
      return {
        statusCode: 200,
        message: "Ambulance deleted successfully",
        data: null,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async toggleAmbulanceAvailability(
    id: string,
  ): Promise<IResponse<TAmbulance>> {
    try {
      // Fetch the current ambulance
      const ambulance = await prisma.ambulance.findUnique({
        where: { id },
      });

      if (!ambulance) {
        throw new AppError("Ambulance not found", 404);
      }

      // Toggle the isAvailable status
      const updatedAmbulance = await prisma.ambulance.update({
        where: { id },
        data: { isAvailable: !ambulance.isAvailable },
      });

      return {
        statusCode: 200,
        message: `Ambulance availability toggled to ${updatedAmbulance.isAvailable}`,
        data: updatedAmbulance,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }
}
