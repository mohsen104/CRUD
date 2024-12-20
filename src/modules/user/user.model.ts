import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
})
class User {
  @prop({ type: () => String, unique: true, index: true })
  public username!: string;

  @prop({ type: () => Number })
  public age!: number;

  @prop({ type: () => String })
  public job!: string;

  @prop({ type: () => String })
  public email?: string;

  @prop({ type: () => String })
  public password?: string;
}

const UserModel = getModelForClass(User);

export default UserModel;
