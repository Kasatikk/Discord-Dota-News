import { getModelForClass } from '@typegoose/typegoose';
import { Dota } from '@/app/services/dota/database/models/Dota';

export const DotaModel = getModelForClass(Dota);
