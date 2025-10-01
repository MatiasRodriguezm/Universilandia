import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { blog, blogId } from './blog';
import type { comentario_auditoria, comentario_auditoriaId } from './comentario_auditoria';
import type { usuario, usuarioId } from './usuario';

export interface comentarioAttributes {
  idComentario: string;
  contenido: string;
  fechaCreacion: Date;
  idUsuario: string;
  idBlog: string;
  activo: boolean;
}

export type comentarioPk = "idComentario";
export type comentarioId = comentario[comentarioPk];
export type comentarioOptionalAttributes = "idComentario" | "fechaCreacion" | "activo";
export type comentarioCreationAttributes = Optional<comentarioAttributes, comentarioOptionalAttributes>;

export class comentario extends Model<comentarioAttributes, comentarioCreationAttributes> implements comentarioAttributes {
  idComentario!: string;
  contenido!: string;
  fechaCreacion!: Date;
  idUsuario!: string;
  idBlog!: string;
  activo!: boolean;

  // comentario belongsTo blog via idBlog
  idBlog_blog!: blog;
  getIdBlog_blog!: Sequelize.BelongsToGetAssociationMixin<blog>;
  setIdBlog_blog!: Sequelize.BelongsToSetAssociationMixin<blog, blogId>;
  createIdBlog_blog!: Sequelize.BelongsToCreateAssociationMixin<blog>;
  // comentario hasMany comentario_auditoria via idComentario
  comentario_auditoria!: comentario_auditoria[];
  getComentario_auditoria!: Sequelize.HasManyGetAssociationsMixin<comentario_auditoria>;
  setComentario_auditoria!: Sequelize.HasManySetAssociationsMixin<comentario_auditoria, comentario_auditoriaId>;
  addComentario_auditorium!: Sequelize.HasManyAddAssociationMixin<comentario_auditoria, comentario_auditoriaId>;
  addComentario_auditoria!: Sequelize.HasManyAddAssociationsMixin<comentario_auditoria, comentario_auditoriaId>;
  createComentario_auditorium!: Sequelize.HasManyCreateAssociationMixin<comentario_auditoria>;
  removeComentario_auditorium!: Sequelize.HasManyRemoveAssociationMixin<comentario_auditoria, comentario_auditoriaId>;
  removeComentario_auditoria!: Sequelize.HasManyRemoveAssociationsMixin<comentario_auditoria, comentario_auditoriaId>;
  hasComentario_auditorium!: Sequelize.HasManyHasAssociationMixin<comentario_auditoria, comentario_auditoriaId>;
  hasComentario_auditoria!: Sequelize.HasManyHasAssociationsMixin<comentario_auditoria, comentario_auditoriaId>;
  countComentario_auditoria!: Sequelize.HasManyCountAssociationsMixin;
  // comentario belongsTo usuario via idUsuario
  idUsuario_usuario!: usuario;
  getIdUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setIdUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createIdUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comentario {
    return comentario.init({
    idComentario: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    contenido: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('sysdatetime')
    },
    idUsuario: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    idBlog: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'blog',
        key: 'idBlog'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'comentario',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "comentario_PK",
        unique: true,
        fields: [
          { name: "idComentario" },
        ]
      },
    ]
  });
  }
}
