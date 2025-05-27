import { prisma } from "../utils/client";
import {
  CreateAssignDto,
  IResponse,
  TAssign,
} from "../utils/interfaces/common";
import AppError from "../utils/error";
import type { Request } from "express";

export class AssignService {
  public static async createAssign(
    assignData: CreateAssignDto,
  ): Promise<IResponse<TAssign>> {
    try {
      // Close all previous accident alerts assigned to the same ambulance
      await prisma.accidentAlerts.updateMany({
        where: {
          assign: {
            some: {
              ambulanceId: assignData.ambulanceId,
            },
          },
          status: { not: "CLOSED" },
        },
        data: { status: "CLOSED" },
      });

      // Delete existing assignment for the same alertId
      await prisma.assign.deleteMany({
        where: { alertId: assignData.alertId },
      });

      // Create the new assignment
      const assign = await prisma.assign.create({
        data: {
          ambulanceId: assignData.ambulanceId,
          alertId: assignData.alertId,
          hospitalId: assignData.hospitalId || null,
        },
      });

      // Update the status of the related accident alert to "PENDING"
      await prisma.accidentAlerts.update({
        where: { id: assignData.alertId },
        data: { status: "PENDING" },
      });

      return {
        statusCode: 201,
        message: "Assignment created successfully",
        data: assign,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async getAssign(alertId: string): Promise<IResponse<TAssign>> {
    try {
      const assign = await prisma.assign.findFirst({
        where: { alertId },
        include: {
          ambulance: true,
          alert: true,
          hospital: true,
        },
      });
      if (!assign) {
        return {
          statusCode: 200,
          message: "Assignment not found",
          data: {} as TAssign,
        };
      }
      return {
        statusCode: 200,
        message: "Assignment fetched successfully",
        data: assign,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async deleteAssign(id: string): Promise<IResponse<null>> {
    try {
      await prisma.assign.delete({
        where: { id },
      });
      return {
        statusCode: 200,
        message: "Assignment deleted successfully",
        data: null,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async getAssignedAlertsForAmbulance(
    req: Request,
  ): Promise<IResponse<TAssign[]>> {
    try {
      const assignments = await prisma.assign.findMany({
        where: {
          ambulance: {
            driverId: req.user?.id,
          },
        },
        include: {
          ambulance: true,
          alert: true,
          hospital: true,
        },
      });

      return {
        statusCode: 200,
        message: "Assigned alerts fetched successfully",
        data: assignments,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }
}
