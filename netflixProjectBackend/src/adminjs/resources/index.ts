import { ResourceWithOptions } from "adminjs";
import { Category, Episode, Serie, User } from "../../models";
import { categoryResourceOptions } from "./category";
import { serieResourceFeatures, serieResourceOptions } from "./serie";
import { episodeResourceFeatures, episodeResourceOptions } from "./episode";
import { userResourceOptions } from "./user";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOptions
    },
    {
        resource: Serie,
        options: serieResourceOptions,
        features: serieResourceFeatures
    },
    {
        resource: Episode,
        options: episodeResourceOptions,
        features: episodeResourceFeatures
    },
    {
        resource: User,
        options: userResourceOptions
    }
]