import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import type { carreraUni, carreraUniId } from './carreraUni';

export interface multimediaAttributes {
  idMultimedia: string;
  url: string;
  descripcion?: string;
}

export type multimediaPk = "idMultimedia";
export type multimediaId = multimedia[multimediaPk];
export type multimediaOptionalAttributes = "idMultimedia" | "descripcion";
export type multimediaCreationAttributes = Optional<multimediaAttributes, multimediaOptionalAttributes>;

export class multimedia extends Model<multimediaAttributes, multimediaCreationAttributes> implements multimediaAttributes {
  idMultimedia!: string;
  url!: string;
  descripcion?: string;

  // multimedia hasMany carreraUni via idMultimedia
  carreraUnis!: carreraUni[];
  getCarreraUnis!: Sequelize.HasManyGetAssociationsMixin<carreraUni>;
  setCarreraUnis!: Sequelize.HasManySetAssociationsMixin<carreraUni, carreraUniId>;
  addCarreraUni!: Sequelize.HasManyAddAssociationMixin<carreraUni, carreraUniId>;
  addCarreraUnis!: Sequelize.HasManyAddAssociationsMixin<carreraUni, carreraUniId>;
  createCarreraUni!: Sequelize.HasManyCreateAssociationMixin<carreraUni>;
  removeCarreraUni!: Sequelize.HasManyRemoveAssociationMixin<carreraUni, carreraUniId>;
  removeCarreraUnis!: Sequelize.HasManyRemoveAssociationsMixin<carreraUni, carreraUniId>;
  hasCarreraUni!: Sequelize.HasManyHasAssociationMixin<carreraUni, carreraUniId>;
  hasCarreraUnis!: Sequelize.HasManyHasAssociationsMixin<carreraUni, carreraUniId>;
  countCarreraUnis!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof multimedia {
    return multimedia.init({
    idMultimedia: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('newsequentialid'),
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'multimedia',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "multimedia_PK",
        unique: true,
        fields: [
          { name: "idMultimedia" },
        ]
      },
    ]
  });
  }
}
