/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../utils/client";
import { IResponse } from "../utils/interfaces/common";
import AppError from "../utils/error";

export class StatisticService {
  public static async getStatisticsByMonth(
    year: number,
  ): Promise<IResponse<any>> {
    try {
      const [
        ambulanceTeams,
        dispatcher,
        accident,
        ambulance,
        newAlerts,
        closedAlerts,
      ] = await Promise.all([
        prisma.user.findMany({
          where: {
            createdAt: {
              gte: new Date(`${year}-01-01`),
              lt: new Date(`${year + 1}-01-01`),
            },
            roles: {
              some: {
                role: "AMBTEAM",
              },
            },
          },
          select: {
            createdAt: true,
          },
        }),
        prisma.user.findMany({
          where: {
            createdAt: {
              gte: new Date(`${year}-01-01`),
              lt: new Date(`${year + 1}-01-01`),
            },
            roles: {
              some: {
                role: "DISPATCHER",
              },
            },
          },
          select: {
            createdAt: true,
          },
        }),

        prisma.accidentAlerts.findMany({
          where: {
            createdAt: {
              gte: new Date(`${year}-01-01`),
              lt: new Date(`${year + 1}-01-01`),
            },
          },
          select: {
            createdAt: true,
          },
        }),
        prisma.ambulance.findMany({
          where: {
            createdAt: {
              gte: new Date(`${year}-01-01`),
              lt: new Date(`${year + 1}-01-01`),
            },
          },
          select: {
            createdAt: true,
          },
        }),
        prisma.accidentAlerts.findMany({
          where: {
            createdAt: {
              gte: new Date(`${year}-01-01`),
              lt: new Date(`${year + 1}-01-01`),
            },
            status: "NEW",
          },
          select: {
            createdAt: true,
          },
        }),
        prisma.accidentAlerts.findMany({
          where: {
            createdAt: {
              gte: new Date(`${year}-01-01`),
              lt: new Date(`${year + 1}-01-01`),
            },
            status: "CLOSED",
          },
          select: {
            createdAt: true,
          },
        }),
      ]);

      const ambulanceTeamsCountByMonth = Array(12).fill(0);
      const dispatchersCountByMonth = Array(12).fill(0);
      const accidentAlertsCountByMonth = Array(12).fill(0);
      const ambulanceCountByMonth = Array(12).fill(0);
      const newAlertsCountByMonth = Array(12).fill(0);
      const closedAlertsCountByMonth = Array(12).fill(0);

      ambulanceTeams.forEach((ambulanceTeam) => {
        const month = new Date(ambulanceTeam.createdAt).getMonth();
        ambulanceTeamsCountByMonth[month]++;
      });

      dispatcher.forEach((dispatcher) => {
        const month = new Date(dispatcher.createdAt).getMonth();
        dispatchersCountByMonth[month]++;
      });

      accident.forEach((accAlet) => {
        const month = new Date(accAlet.createdAt).getMonth();
        accidentAlertsCountByMonth[month]++;
      });

      ambulance.forEach((ambu) => {
        const month = new Date(ambu.createdAt).getMonth();
        ambulanceCountByMonth[month]++;
      });

      newAlerts.forEach((alert) => {
        const month = new Date(alert.createdAt).getMonth();
        newAlertsCountByMonth[month]++;
      });

      closedAlerts.forEach((alert) => {
        const month = new Date(alert.createdAt).getMonth();
        closedAlertsCountByMonth[month]++;
      });

      return {
        message: "Statistics by month fetched successfully",
        statusCode: 200,
        data: {
          ambulanceTeamsCountByMonth,
          dispatchersCountByMonth,
          accidentAlertsCountByMonth,
          ambulanceCountByMonth,
          newAlertsCountByMonth,
          closedAlertsCountByMonth,
        },
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }
}
