import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { comentario, comentarioId } from './comentario';
import type { usuario, usuarioId } from './usuario';

export interface comentario_auditoriaAttributes {
  idAuditoria: string;
  idComentario: string;
  idUsuario: string;
  contenidoOriginal: string;
  fechaEliminacion?: Date;
  motivo?: string;
}

export type comentario_auditoriaPk = "idAuditoria";
export type comentario_auditoriaId = comentario_auditoria[comentario_auditoriaPk];
export type comentario_auditoriaOptionalAttributes = "idAuditoria" | "fechaEliminacion" | "motivo";
export type comentario_auditoriaCreationAttributes = Optional<comentario_auditoriaAttributes, comentario_auditoriaOptionalAttributes>;

export class comentario_auditoria extends Model<comentario_auditoriaAttributes, comentario_auditoriaCreationAttributes> implements comentario_auditoriaAttributes {
  idAuditoria!: string;
  idComentario!: string;
  idUsuario!: string;
  contenidoOriginal!: string;
  fechaEliminacion?: Date;
  motivo?: string;

  // comentario_auditoria belongsTo comentario via idComentario
  idComentario_comentario!: comentario;
  getIdComentario_comentario!: Sequelize.BelongsToGetAssociationMixin<comentario>;
  setIdComentario_comentario!: Sequelize.BelongsToSetAssociationMixin<comentario, comentarioId>;
  createIdComentario_comentario!: Sequelize.BelongsToCreateAssociationMixin<comentario>;
  // comentario_auditoria belongsTo usuario via idUsuario
  idUsuario_usuario!: usuario;
  getIdUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setIdUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createIdUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comentario_auditoria {
    return comentario_auditoria.init({
    idAuditoria: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    idComentario: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'comentario',
        key: 'idComentario'
      }
    },
    idUsuario: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    contenidoOriginal: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fechaEliminacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    motivo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comentario_auditoria',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__comentar__F1F3070158B0D834",
        unique: true,
        fields: [
          { name: "idAuditoria" },
        ]
      },
    ]
  });
  }
}
