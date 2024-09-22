import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const episodeResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'serieId', 'order', 'uploadVideo', 'secondsLong'  ],
  filterProperties: ['name', 'synopsis', 'serieId', 'secondsLong', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'serieId', 'order', 'secondsLong'],
  showProperties: ['id', 'name', 'synopsis', 'serieId', 'order', 'videoUrl', 'secondsLong', 'createdAt', 'updatedAt']
}

export const episodeResourceFeatures: FeatureType[] = [
    uploadFileFeature({
        provider:{
            local:{
                bucket: path.join(__dirname, '..', '..', '..', 'uploads')
            }
        },
        properties: {
            key: 'videoUrl',
            file: 'uploadVideo'
         },
        uploadPath: (record, filename) => `videos/serie-${record.get('serieId')}/${filename}`
    })
]