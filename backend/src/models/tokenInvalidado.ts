import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';

export interface TokenInvalidadoAttributes {
  token: string;
  expiracion: Date;
}

export type TokenInvalidadoPk = "token";
export type TokenInvalidadoId = TokenInvalidado[TokenInvalidadoPk];
export type TokenInvalidadoCreationAttributes = TokenInvalidadoAttributes;

export class TokenInvalidado extends Model<TokenInvalidadoAttributes, TokenInvalidadoCreationAttributes> implements TokenInvalidadoAttributes {
  token!: string;
  expiracion!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof TokenInvalidado {
    return TokenInvalidado.init({
    token: {
      type: DataTypes.STRING(512),
      allowNull: false,
      primaryKey: true
    },
    expiracion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TokenInvalidado',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TokenInv__CA90DA7BAF5BD12A",
        unique: true,
        fields: [
          { name: "token" },
        ]
      },
    ]
  });
  }
}
