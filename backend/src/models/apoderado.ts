import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { autorizacion, autorizacionId } from './autorizacion';
import type { estudiante, estudianteId } from './estudiante';

export interface apoderadoAttributes {
  idApoderado: string;
  rut: string;
  primerNombre: string;
  segundoNombre?: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  telefono: string;
  correo: string;
}

export type apoderadoPk = "idApoderado";
export type apoderadoId = apoderado[apoderadoPk];
export type apoderadoOptionalAttributes = "segundoNombre";
export type apoderadoCreationAttributes = Optional<apoderadoAttributes, apoderadoOptionalAttributes>;

export class apoderado extends Model<apoderadoAttributes, apoderadoCreationAttributes> implements apoderadoAttributes {
  idApoderado!: string;
  rut!: string;
  primerNombre!: string;
  segundoNombre?: string;
  apellidoMaterno!: string;
  apellidoPaterno!: string;
  telefono!: string;
  correo!: string;

  // apoderado hasMany autorizacion via idApoderado
  autorizacions!: autorizacion[];
  getAutorizacions!: Sequelize.HasManyGetAssociationsMixin<autorizacion>;
  setAutorizacions!: Sequelize.HasManySetAssociationsMixin<autorizacion, autorizacionId>;
  addAutorizacion!: Sequelize.HasManyAddAssociationMixin<autorizacion, autorizacionId>;
  addAutorizacions!: Sequelize.HasManyAddAssociationsMixin<autorizacion, autorizacionId>;
  createAutorizacion!: Sequelize.HasManyCreateAssociationMixin<autorizacion>;
  removeAutorizacion!: Sequelize.HasManyRemoveAssociationMixin<autorizacion, autorizacionId>;
  removeAutorizacions!: Sequelize.HasManyRemoveAssociationsMixin<autorizacion, autorizacionId>;
  hasAutorizacion!: Sequelize.HasManyHasAssociationMixin<autorizacion, autorizacionId>;
  hasAutorizacions!: Sequelize.HasManyHasAssociationsMixin<autorizacion, autorizacionId>;
  countAutorizacions!: Sequelize.HasManyCountAssociationsMixin;
  // apoderado belongsToMany estudiante via idApoderado and idEstudiante
  idEstudiante_estudiantes!: estudiante[];
  getIdEstudiante_estudiantes!: Sequelize.BelongsToManyGetAssociationsMixin<estudiante>;
  setIdEstudiante_estudiantes!: Sequelize.BelongsToManySetAssociationsMixin<estudiante, estudianteId>;
  addIdEstudiante_estudiante!: Sequelize.BelongsToManyAddAssociationMixin<estudiante, estudianteId>;
  addIdEstudiante_estudiantes!: Sequelize.BelongsToManyAddAssociationsMixin<estudiante, estudianteId>;
  createIdEstudiante_estudiante!: Sequelize.BelongsToManyCreateAssociationMixin<estudiante>;
  removeIdEstudiante_estudiante!: Sequelize.BelongsToManyRemoveAssociationMixin<estudiante, estudianteId>;
  removeIdEstudiante_estudiantes!: Sequelize.BelongsToManyRemoveAssociationsMixin<estudiante, estudianteId>;
  hasIdEstudiante_estudiante!: Sequelize.BelongsToManyHasAssociationMixin<estudiante, estudianteId>;
  hasIdEstudiante_estudiantes!: Sequelize.BelongsToManyHasAssociationsMixin<estudiante, estudianteId>;
  countIdEstudiante_estudiantes!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof apoderado {
    return apoderado.init({
    idApoderado: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    rut: {
      type: DataTypes.STRING(9),
      allowNull: false,
      unique: "UQ__apoderad__C2B74E7614D72CE9"
    },
    primerNombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    segundoNombre: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    apellidoMaterno: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellidoPaterno: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'apoderado',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__apoderad__D735979D556E024E",
        unique: true,
        fields: [
          { name: "idApoderado" },
        ]
      },
      {
        name: "UQ__apoderad__C2B74E7614D72CE9",
        unique: true,
        fields: [
          { name: "rut" },
        ]
      },
    ]
  });
  }
}
