import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRequestDto } from 'src/dto/request.dto';
import { Request } from 'src/entities/request.entity';
import { setTimezone } from 'src/utils/utils';
import { Repository } from 'typeorm';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>
    ) { }

    async getAll(): Promise<Request[]> {
        return await this.requestRepository.find({ order: { dateCreate: "ASC" } });
    }

    async getOne(id: number): Promise<Request> {
        return await this.requestRepository.findOneBy({ id });
    }

    async create(body: CreateRequestDto): Promise<Request> {
        return await this.requestRepository.save({
            ...body,
            dateCreate: setTimezone(new Date())
        })
    }

}
