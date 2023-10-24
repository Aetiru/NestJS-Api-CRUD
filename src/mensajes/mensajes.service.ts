import { Injectable } from '@nestjs/common';
import { Mensaje } from './entities/mensaje.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';

@Injectable()
export class MensajesService {

    constructor(
        @InjectRepository(Mensaje)
        private mensajeRepository: Repository<Mensaje>,
    ) {}

    async getAll(): Promise<Mensaje[]> {
        return await this.mensajeRepository.find();
    }

    async CreateMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje> {
        const nuevo = new Mensaje();
        nuevo.mensaje = mensajeNuevo.mensaje;
        nuevo.nick = mensajeNuevo.nick;

        return this.mensajeRepository.save(nuevo);
    }

    async updateMensaje(idMensaje: number, mensajeActualizar: CreateMensajeDto): Promise<Mensaje> {
        const mensajeUpdate = await this.mensajeRepository.findOneById(idMensaje);
        mensajeUpdate.nick = mensajeActualizar.nick;
        mensajeUpdate.mensaje = mensajeActualizar.mensaje;

        return await this.mensajeRepository.save(mensajeUpdate);
    }

    async deleteMensaje(idMensaje: any): Promise<any> {
        return await this.mensajeRepository.delete(idMensaje);
    }
}
