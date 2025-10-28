import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { apoderado, apoderadoId } from './apoderado';
import type { estudiante, estudianteId } from './estudiante';

export interface autorizacionAttributes {
  idEstudiante: string;
  idApoderado: string;
  autorizado: boolean;
  fechaAutorizacion: string;
}

export type autorizacionPk = "idEstudiante" | "idApoderado";
export type autorizacionId = autorizacion[autorizacionPk];
export type autorizacionCreationAttributes = autorizacionAttributes;

export class autorizacion extends Model<autorizacionAttributes, autorizacionCreationAttributes> implements autorizacionAttributes {
  idEstudiante!: string;
  idApoderado!: string;
  autorizado!: boolean;
  fechaAutorizacion!: string;

  // autorizacion belongsTo apoderado via idApoderado
  idApoderado_apoderado!: apoderado;
  getIdApoderado_apoderado!: Sequelize.BelongsToGetAssociationMixin<apoderado>;
  setIdApoderado_apoderado!: Sequelize.BelongsToSetAssociationMixin<apoderado, apoderadoId>;
  createIdApoderado_apoderado!: Sequelize.BelongsToCreateAssociationMixin<apoderado>;
  // autorizacion belongsTo estudiante via idEstudiante
  idEstudiante_estudiante!: estudiante;
  getIdEstudiante_estudiante!: Sequelize.BelongsToGetAssociationMixin<estudiante>;
  setIdEstudiante_estudiante!: Sequelize.BelongsToSetAssociationMixin<estudiante, estudianteId>;
  createIdEstudiante_estudiante!: Sequelize.BelongsToCreateAssociationMixin<estudiante>;

  static initModel(sequelize: Sequelize.Sequelize): typeof autorizacion {
    return autorizacion.init({
    idEstudiante: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'estudiante',
        key: 'idEstudiante'
      }
    },
    idApoderado: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'apoderado',
        key: 'idApoderado'
      }
    },
    autorizado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    fechaAutorizacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'autorizacion',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__autoriza__638C82BC39571643",
        unique: true,
        fields: [
          { name: "idEstudiante" },
          { name: "idApoderado" },
        ]
      },
    ]
  });
  }
}
