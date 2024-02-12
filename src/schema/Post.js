import { sequelize, DataTypes, Model } from "@/utils/sequelize";

class Post extends Model {}
Post.init(
  {
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    editorsPick: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    mostPopular: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    socialMediaLink1: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    socialMediaLink2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    socialMediaLink3: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    socialMediaLinkIndex1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    socialMediaLinkIndex2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    socialMediaLinkIndex3: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { sequelize, modelName: "post" }
);
sequelize.sync({ force: false, alter: false });
export default Post;
