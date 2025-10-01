import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { suscripcion, suscripcionId } from './suscripcion';
import type { usuario, usuarioId } from './usuario';

export interface transaccionAttributes {
  idTransaccion: string;
  idUsuario: string;
  monto: number;
  fechaPa: Date;
  estado: string;
  metodoPa: string;
  referenciaExterna?: string;
  idSuscripcion?: string;
}

export type transaccionPk = "idTransaccion";
export type transaccionId = transaccion[transaccionPk];
export type transaccionOptionalAttributes = "idTransaccion" | "fechaPa" | "referenciaExterna" | "idSuscripcion";
export type transaccionCreationAttributes = Optional<transaccionAttributes, transaccionOptionalAttributes>;

export class transaccion extends Model<transaccionAttributes, transaccionCreationAttributes> implements transaccionAttributes {
  idTransaccion!: string;
  idUsuario!: string;
  monto!: number;
  fechaPa!: Date;
  estado!: string;
  metodoPa!: string;
  referenciaExterna?: string;
  idSuscripcion?: string;

  // transaccion belongsTo suscripcion via idSuscripcion
  idSuscripcion_suscripcion!: suscripcion;
  getIdSuscripcion_suscripcion!: Sequelize.BelongsToGetAssociationMixin<suscripcion>;
  setIdSuscripcion_suscripcion!: Sequelize.BelongsToSetAssociationMixin<suscripcion, suscripcionId>;
  createIdSuscripcion_suscripcion!: Sequelize.BelongsToCreateAssociationMixin<suscripcion>;
  // transaccion belongsTo usuario via idUsuario
  idUsuario_usuario!: usuario;
  getIdUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setIdUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createIdUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof transaccion {
    return transaccion.init({
    idTransaccion: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    idUsuario: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    monto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fechaPa: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('sysdatetime')
    },
    estado: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    metodoPa: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    referenciaExterna: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    idSuscripcion: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'suscripcion',
        key: 'idSuscripcion'
      }
    }
  }, {
    sequelize,
    tableName: 'transaccion',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__transacc__5B8761F0EEE03922",
        unique: true,
        fields: [
          { name: "idTransaccion" },
        ]
      },
    ]
  });
  }
}
