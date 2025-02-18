import {Module} from "@nestjs/common"
import { TemplateController } from "./template.controller";
import { TemplateService } from "./template.service";
import { AnthropicService } from "src/modules/anthropic.service";

@Module({
    controllers:[TemplateController],
    providers:[TemplateService,AnthropicService]
})
export class TemplateModule {}