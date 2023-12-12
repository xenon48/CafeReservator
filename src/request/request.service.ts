import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRequestDto } from 'src/dto/request.dto';
import { Request } from 'src/entities/request.entity';
import { setTimezone } from 'src/utils/utils';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>
    ) { }

    async getAll(from?: string, to?: string, actual: boolean = true): Promise<Request[]> {
        let whereOptions = { actual };
        if (from && !to) { whereOptions["dateStart"] = MoreThanOrEqual(from) }
        else if (!from && to) { whereOptions["dateStart"] = LessThanOrEqual(to) }
        else if (from && to) { whereOptions["dateStart"] = Between(from, to) }
        return await this.requestRepository.find({ where: whereOptions, order: { dateCreate: "ASC" } });
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

    async update(body: Request): Promise<Request> {
        return await this.requestRepository.save(body);
    }

}
