import React, {HTMLAttributes} from "react";
import {Photo} from "../../../domain/entities/Photo";
import {concatClasses} from "../../../tools/util-functions";
import s from "./PhotoGallery.module.css";
import Converter from "../../../tools/converter";

export interface PhotoViewerProps extends HTMLAttributes<HTMLDivElement> {

    photos: Photo[];

    onPhotoChoose?: (photoId: number) => void;

    addPhoto?: () => void;

}

const PhotoGallery = ({photos, addPhoto, onPhotoChoose,  ...props}: PhotoViewerProps) => {
    const makeImage = photo => (
        <img className={s.photo}
             key={photo.id}
             onClick={() => onPhotoChoose && onPhotoChoose(photo.id)}
             src={
                 photo.data ? Converter.convertImage(photo.data) : require("../../../assets/image-placeholder.png")
             }
             alt={photo.id}
        />
    );

    return (
        <div {...props} className={concatClasses(s.container, props.className)}>
            <span className={s.gallery}>
                {photos.map(makeImage)}
                <span className={`${s.addPhoto} ${s.photo}`} onClick={addPhoto}/>
            </span>
        </div>
    );
};

export default PhotoGallery;