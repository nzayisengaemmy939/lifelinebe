import {
  Body,
  Delete,
  Get,
  Request,
  Path,
  Post,
  Route,
  Tags,
  Middlewares,
  Security,
} from "tsoa";
import { AssignService } from "../services/AssignService";
import {
  IResponse,
  TAssign,
  CreateAssignDto,
} from "../utils/interfaces/common";
import { Request as ExpressRequest } from "express";
import upload from "../utils/cloudinary";
import { appendPhotoAttachments } from "../middlewares/company.middlewares";
import { roles } from "../utils/roles";
import { checkRole } from "../middlewares";

@Tags("Assign")
@Route("/api/assign")
export class AssignController {
  @Post("/")
  @Middlewares(upload.any(), appendPhotoAttachments)
  public async createAssign(
    @Body() assignData: CreateAssignDto,
  ): Promise<IResponse<TAssign>> {
    return AssignService.createAssign(assignData);
  }

  @Get("/{alertId}")
  public async getAssign(@Path() alertId: string): Promise<IResponse<TAssign>> {
    return AssignService.getAssign(alertId);
  }

  @Get("/ambulance/assigned-alerts")
  @Security("jwt")
  @Middlewares(checkRole(roles.AMBTEAM))
  public async getAssignedAlertsForAmbulance(@Request() req: ExpressRequest) {
    return AssignService.getAssignedAlertsForAmbulance(req);
  }

  @Delete("/{id}")
  public async deleteAssign(@Path() id: string): Promise<IResponse<null>> {
    return AssignService.deleteAssign(id);
  }
}
