import {
  Body,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Tags,
  Middlewares,
} from "tsoa";
import { AmbulanceService } from "../services/AmbulanceService";
import {
  IResponse,
  TAmbulance,
  CreateAmbulanceDto,
  UpdateAmbulanceDto,
} from "../utils/interfaces/common";
import upload from "../utils/cloudinary";
import { appendPhotoAttachments } from "../middlewares/company.middlewares";
@Tags("Ambulance")
@Route("/api/ambulance")
export class AmbulanceController {
  @Post("/")
  @Middlewares(upload.any(), appendPhotoAttachments)
  public async createAmbulance(
    @Body() data: CreateAmbulanceDto,
  ): Promise<IResponse<TAmbulance>> {
    return AmbulanceService.createAmbulance(data);
  }

  @Get("/{id}")
  public async getAmbulance(
    @Path() id: string,
  ): Promise<IResponse<TAmbulance>> {
    return AmbulanceService.getAmbulance(id);
  }

  @Get("/")
  public async getAllAmbulances(): Promise<IResponse<TAmbulance[]>> {
    return AmbulanceService.getAllAmbulances();
  }

  @Get("/available")
  public async getAvailableAmbulances(): Promise<IResponse<TAmbulance[]>> {
    return AmbulanceService.getAvailableAmbulances();
  }

  @Put("/{id}")
  @Middlewares(upload.any(), appendPhotoAttachments)
  public async updateAmbulance(
    @Path() id: string,
    @Body() data: UpdateAmbulanceDto,
  ): Promise<IResponse<TAmbulance>> {
    return AmbulanceService.updateAmbulance(id, data);
  }

  @Put("/toggle-availability/{id}")
  public async toggleAmbulanceAvailability(
    @Path() id: string,
  ): Promise<IResponse<TAmbulance>> {
    return AmbulanceService.toggleAmbulanceAvailability(id);
  }

  @Delete("/{id}")
  public async deleteAmbulance(@Path() id: string): Promise<IResponse<null>> {
    return AmbulanceService.deleteAmbulance(id);
  }
}
