import { Info } from "./A.model";
import { Bar } from "./B.model";

const setupAssocations = () => {
    Info.hasOne(Bar, {foreignKey: 'info_id'})
    Bar.belongsTo(Info, {foreignKey: 'info_id'})
    
}

export default setupAssocations;