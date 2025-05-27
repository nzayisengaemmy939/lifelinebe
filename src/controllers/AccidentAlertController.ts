import { Body, Delete, Get, Path, Post, Put, Route, Tags, Request } from "tsoa";
import { AccidentAlertService } from "../services/AccidentAlertService";
import {
  CreateAccidentAlertDto,
  IResponse,
  TAccidentAlert,
} from "../utils/interfaces/common";
import { Request as Req } from "express";

@Tags("AccidentAlert")
@Route("/api/accident-alert")
export class AccidentAlertController {
  @Get("/")
  public async getAccidentAlerts(): Promise<IResponse<TAccidentAlert[]>> {
    return AccidentAlertService.getAllAccidentAlerts();
  }

  @Get("/{id}")
  public async getAccidentAlert(
    @Path() id: string,
  ): Promise<IResponse<TAccidentAlert | null>> {
    return AccidentAlertService.getAccidentAlert(id);
  }

  @Post("/")
  public async createAccidentAlert(
    @Body() alertData: CreateAccidentAlertDto,
    @Request() request: Req,
  ): Promise<IResponse<TAccidentAlert>> {
    const { phoneNumber, email, status, ...rest } = alertData;
    const updatedAlertData = {
      ...rest,
      phoneNumber: phoneNumber || null,
      email: email || null,
      status: status || "NEW",
    };
    return new AccidentAlertService(request).createAccidentAlert(
      updatedAlertData,
    );
  }

  @Put("/{id}")
  public async updateAccidentAlert(
    @Path() id: string,
    @Body() alertData: CreateAccidentAlertDto,
  ): Promise<IResponse<TAccidentAlert | null>> {
    return AccidentAlertService.updateAccidentAlert(id, alertData);
  }

  @Delete("/{id}")
  public async deleteAccidentAlert(
    @Path() id: string,
  ): Promise<IResponse<null>> {
    await AccidentAlertService.deleteAccidentAlert(id);
    return {
      statusCode: 200,
      message: "Accident alert deleted successfully",
    };
  }
}
