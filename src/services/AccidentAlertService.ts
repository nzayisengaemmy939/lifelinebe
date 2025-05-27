import { BaseService } from "./Service";
import { prisma } from "../utils/client";
import {
  CreateAccidentAlertDto,
  IResponse,
  TAccidentAlert,
} from "../utils/interfaces/common";
import AppError from "../utils/error";

export class AccidentAlertService extends BaseService {
  public async createAccidentAlert(
    alertData: CreateAccidentAlertDto,
  ): Promise<IResponse<TAccidentAlert>> {
    try {
      const newAlert = await prisma.accidentAlerts.create({
        data: {
          title: alertData.title || null,
          description: alertData.description || null,
          location: alertData.location || null,
          latitude: alertData.latitude,
          longitude: alertData.longitude,
          phoneNumber: alertData.phoneNumber,
          email: alertData.email,
          status: alertData.status || "NEW",
        },
      });
      return {
        statusCode: 201,
        message: "Accident alert created successfully",
        data: newAlert,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async getAccidentAlert(
    alertId: string,
  ): Promise<IResponse<TAccidentAlert>> {
    try {
      const alert = await prisma.accidentAlerts.findUnique({
        where: {
          id: alertId,
        },
      });

      if (!alert) {
        throw new AppError("Accident alert not found", 404);
      }
      return {
        statusCode: 200,
        message: "Accident alert fetched successfully",
        data: alert,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async getAllAccidentAlerts(): Promise<
    IResponse<TAccidentAlert[]>
  > {
    try {
      const alerts = await prisma.accidentAlerts.findMany();

      return {
        statusCode: 200,
        message: "Accident alerts fetched successfully",
        data: alerts,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async updateAccidentAlert(
    alertId: string,
    alertData: Partial<CreateAccidentAlertDto>,
  ): Promise<IResponse<TAccidentAlert>> {
    try {
      const updatedAlert = await prisma.accidentAlerts.update({
        where: { id: alertId },
        data: {
          ...alertData,
        },
      });
      return {
        statusCode: 200,
        message: "Accident alert updated successfully",
        data: updatedAlert,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async deleteAccidentAlert(
    alertId: string,
  ): Promise<IResponse<null>> {
    try {
      await prisma.accidentAlerts.delete({ where: { id: alertId } });
      return {
        statusCode: 200,
        message: "Accident alert deleted successfully",
        data: null,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }
}
