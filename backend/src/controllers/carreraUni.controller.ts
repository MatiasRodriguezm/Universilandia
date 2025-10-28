import type { Request, Response } from 'express';
import { getSignedUrl } from '../utils/storage.js';
import { carreraUni, universidad, multimedia } from '../models/init-models.js';

// Obtener todas las carreras universitarias
export const listarCarrerasUniversitarias = async (req: Request, res: Response): Promise<void> => {
  try {
    const carreras = await carreraUni.findAll();
    res.status(200).json(carreras);
  } catch (error) {
    console.error('Error al obtener carreras universitarias:', error);
    res.status(500).json({ error: 'Error interno al obtener carreras universitarias' });
  }
};

// Obtener una carrera universitaria por ID
export const CarreraUniversitariaPorId = async (req: Request, res: Response): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { idCarrUni } = req.params;
      if (!idCarrUni) {
        res.status(400).json({ error: 'El idCarrera es obligatorio' });
        return resolve();
      }

      const Carrera = await carreraUni.findByPk(idCarrUni, {
        include: [
          {
            model: universidad,
            as: 'idUniversidad_universidad',
            attributes: ['nombreUniversidad']
          },
          {
            model: multimedia,
            as: 'idMultimedia_multimedium',
            attributes: ['idMultimedia', 'url', 'descripcion']
          }
        ]
      });

      if (!Carrera) {
        res.status(404).json({ error: 'Carrera no encontrada' });
        return resolve();
      }

      // Usar directamente el nombre de archivo (sin prefijo)
      let urlVideo = null;
      if (Carrera.idMultimedia_multimedium?.url) {
        urlVideo = await getSignedUrl(Carrera.idMultimedia_multimedium.url);
      }

      res.status(200).json({
        ...Carrera.toJSON(),
        urlVideo,
      });

      resolve();
    } catch (error) {
      console.error('Error al obtener carrera universitaria por ID:', error);
      res.status(500).json({ error: 'Error interno al obtener carrera universitaria por ID' });
      reject(error);
    }
  });
};
