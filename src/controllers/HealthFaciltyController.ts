import {
  Body,
  Get,
  Post,
  Put,
  Delete,
  Route,
  Tags,
  Path,
  Security,
  Middlewares,
} from "tsoa";
import { HealthFacilityService } from "../services/HealthFacilityservice";
import {
  IResponse,
  THealthFacility,
  CreateHealthFacilityDto,
} from "../utils/interfaces/common";
import { appendPhoto } from "../middlewares/company.middlewares";
import upload from "../utils/cloudinary";

@Tags("HealthFacility")
@Route("/api/health-facility")
export class HealthFacilityController {
  @Get("/")
  public async getHealthFacilities(): Promise<IResponse<THealthFacility[]>> {
    return HealthFacilityService.getAllHealthFacilities();
  }

  @Get("/{id}")
  public async getHealthFacility(
    @Path() id: string,
  ): Promise<IResponse<THealthFacility>> {
    return HealthFacilityService.getHealthFacility(id);
  }

  @Post("/")
  @Security("jwt")
  @Middlewares(upload.any(), appendPhoto)
  public async createHealthFacility(
    @Body() data: CreateHealthFacilityDto,
  ): Promise<IResponse<THealthFacility>> {
    return HealthFacilityService.createHealthFacility(data);
  }

  @Put("/{id}")
  @Security("jwt")
  @Middlewares(upload.any(), appendPhoto)
  public async updateHealthFacility(
    @Path() id: string,
    @Body() data: Partial<CreateHealthFacilityDto>,
  ): Promise<IResponse<THealthFacility>> {
    return HealthFacilityService.updateHealthFacility(id, data);
  }

  @Delete("/{id}")
  @Security("jwt")
  public async deleteHealthFacility(
    @Path() id: string,
  ): Promise<IResponse<null>> {
    return HealthFacilityService.deleteHealthFacility(id);
  }
}
