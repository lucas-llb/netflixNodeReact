import { Category } from "./Category";
import { Episode } from "./Episode";
import { Favorite } from "./Favorite";
import { Like } from "./Like";
import { Serie } from "./Serie";
import { User } from "./User";
import { WatchTime } from "./WatchTime";

Category.hasMany(Serie, {as: 'series'});

Serie.belongsTo(Category);
Serie.belongsToMany(User, { through: Favorite })
Serie.belongsToMany(User, { through: Like })
Serie.hasMany(Episode, { as: 'episodes'});
Serie.hasMany(Favorite, { as: 'FavoritesUsers', foreignKey: 'serie_id'})

Episode.belongsTo(Serie);
Episode.belongsToMany(User, {through: WatchTime })

Favorite.belongsTo(Serie)
Favorite.belongsTo(User)

User.belongsToMany(Serie, { through: Favorite })
User.belongsToMany(Serie, { through: Like })
User.belongsToMany(Episode, {through: WatchTime })
User.hasMany(Favorite, { as: 'FavoritesCourse', foreignKey: 'user_id'})

export {
    Category,
    Serie,
    Episode,
    User,
    Like,
    Favorite
}