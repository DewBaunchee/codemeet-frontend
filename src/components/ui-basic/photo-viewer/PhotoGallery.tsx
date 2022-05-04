import React, {HTMLAttributes} from 'react';
import {Photo} from "../../../domain/entities/Photo";
import {concatClasses} from "../../../tools/util-functions";
import s from "./PhotoGallery.module.css";
import ImageConverter from "../../../tools/converter";

export interface PhotoViewerProps extends HTMLAttributes<HTMLDivElement> {

    photos: Photo[];

    addPhoto?: () => void;

}

const PhotoGallery = ({photos, addPhoto, ...props}: PhotoViewerProps) => {
    const makeImage = photo => (
        <img className={s.photo} src={
            photo.data ? ImageConverter.convert(photo.data) : require("../../../assets/image-placeholder.png")
        } alt=""/>
    )
    return (
        <div {...props} className={concatClasses(s.container, props.className)}>
            <span className={s.gallery}>
                {photos.map(makeImage)}
            </span>
        </div>
    );
};

export default PhotoGallery;