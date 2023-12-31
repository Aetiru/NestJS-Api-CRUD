import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';
import { log } from 'console';

@Controller('mensajes')
export class MensajesController {
    constructor(private mensajesService: MensajesService) {
        
    }


    @Post()
    Create (@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
        this.mensajesService.CreateMensaje(createMensajeDto).then( mensaje => {
            response.status(HttpStatus.CREATED).json(mensaje);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la creacion del mensaje'});
        }); 
    }

    @Get()
    getAll(@Res() response) {
        this.mensajesService.getAll().then(mensajesList => {
            response.status(HttpStatus.OK).json(mensajesList);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la obtencion de mensajes'});
        });
    }

    @Put(':id')
    update (@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje) {
        this.mensajesService.updateMensaje(idMensaje, updateMensajeDto).then(mensaje => {
            response.status(HttpStatus.OK).json(mensaje);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la actualizacion del mensaje'});
        })
    }

    @Delete(':id')
    delete (@Res() response, @Param('id') idMensaje) {
        this.mensajesService.deleteMensaje(idMensaje).then(res => {
            response.status(HttpStatus.OK).json(res);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error al borrar el mensaje'});
        })
    }
    
}
