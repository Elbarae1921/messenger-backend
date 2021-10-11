import { UseMiddleware, Mutation, Arg, Resolver } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

import { LogAccess, ResolveTime } from '../../../middlewares';
import { Upload } from '../types/Upload';
import { UploadOutput } from '../types/UploadOutput';

@Resolver()
export class UploadResolver {
    @UseMiddleware(LogAccess, ResolveTime)
    @Mutation(() => UploadOutput)
    async uploadImage(
        @Arg('file', () => GraphQLUpload) { filename, mimetype, createReadStream }: Upload
    ): Promise<UploadOutput> {
        return new Promise((resolve, reject) => {
            if (mimetype !== 'image/jpeg' && mimetype !== 'image/png' && mimetype !== 'image/gif')
                throw new Error('Photo must be an image file (jpeg/jpg/png)');
            filename = `${Date.now()}-${filename}`;
            console.log(filename);
            createReadStream()
                .pipe(createWriteStream(`${__dirname}/../../../../public/images/${filename}`))
                .on('finish', () => {
                    resolve({
                        filename,
                        mimetype
                    });
                })
                .on('error', () => {
                    reject(new Error('Error uploading file'));
                });
        });
    }
}
