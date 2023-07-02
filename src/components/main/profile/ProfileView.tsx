import React, {ForwardedRef, useEffect, useState} from "react";
import CmWindow from "../../ui-basic/window/CmWindow";
import s from "./Profile.module.css";
import TabbedWindow from "../../ui-basic/tabbed-window/TabbedWindow";
import PhotoGallery from "../../ui-basic/photo-viewer/PhotoGallery";
import SelectableItems from "../../ui-basic/selectable-items/SelectableItems";
import {Profile} from "../../../domain/entities/Profile";
import {ProfileService} from "../../../domain/services/profile/ProfileService";
import SectionTitle from "../../ui-basic/section-title/SectionTitle";
import {Interest} from "../../../domain/entities/Interest";
import {Language} from "../../../domain/entities/Language";
import {ProgrammingLanguage} from "../../../domain/entities/ProgrammingLanguage";
import {DomainService} from "../../../domain/services/domain/DomainService";
import ObjectiveList from "./objectives/ObjectiveList";
import {Objective} from "../../../domain/entities/Objective";
import {ObjectiveService} from "../../../domain/services/objective/ObjectiveService";
import {PhotoImportService} from "../../../domain/services/import/PhotoImportService";
import Avatar from "./avatar/Avatar";

const ProfileView = React.forwardRef(
    (
        props: { gridArea: string; profile?: Profile },
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        const [objectives, setObjectives] = useState<Objective[]>([]);
        const [profile, setProfile] = useState<Profile>();
        const [interests, setInterests] = useState<Interest[]>([]);
        const [languages, setLanguages] = useState<Language[]>([])
        const [programmingLanguages, setProgrammingLanguages] = useState<ProgrammingLanguage[]>([])

        useEffect(() => {
            ObjectiveService.getAll().subscribe(list => {
                setObjectives(list);
            });
            ProfileService.load().subscribe(loaded => {
                setProfile(loaded);
                DomainService.getInterests().subscribe(loaded => {
                    setInterests(loaded);
                });
                DomainService.getLanguages().subscribe(loaded => {
                    setLanguages(loaded);
                });
                DomainService.getProgrammingLanguages().subscribe(loaded => {
                    setProgrammingLanguages(loaded);
                });
            });
        }, []);

        useEffect(() => {
            setName(profile?.name || "");
        }, [profile]);

        const merge = (profile: Profile) => {
            ProfileService.merge(profile).subscribe(profile => setProfile(profile));
        };

        const [name, setName] = useState("");
        const [activeTab, setActiveTab] = useState("Profile");

        return <CmWindow ref={ref} gridArea={props.gridArea} style={{background: "#EEE"}}>
            <div className={`row m-0 ${s.header}`}>
                <Avatar className="align-self-center"
                        style={{marginLeft: "100px"}}
                        profile={profile}
                        name={name}
                        onNameChange={setName}
                        onNameBlur={ProfileService.changeName}
                        editable={true}
                />
            </div>
            <div className="row m-0 justify-content-center">
                <TabbedWindow className="mt-3 p-0 col-xxl-8 col-xl-10 col-lg-12"
                              active={activeTab}
                              onChange={active => setActiveTab(active)}>
                    <div key="Profile">
                        <PhotoGallery photos={profile?.photos || []}
                                      onPhotoChoose={photoId => {
                                          ProfileService.setAvatar(photoId).subscribe(setProfile);
                                      }}
                                      addPhoto={() =>
                                          PhotoImportService.import([".jpg"])
                                              .then(files => {
                                                  if (!files) return;

                                                  const formData = new FormData();
                                                  for (let i = 0; i < files.length; i++) {
                                                      formData.append("photos", files[i], files[i].name);
                                                  }

                                                  ProfileService.addPhotos(formData).subscribe(setProfile);
                                              })
                                      }
                        />

                        <SectionTitle label="Your interests"/>
                        <SelectableItems style={{display: "block"}}
                                         items={
                                             interests.map(interest => ({
                                                 key: interest.key,
                                                 name: interest.key,
                                             }))
                                         }
                                         selected={
                                             (profile?.interests || []).map(interest => interest.key)
                                         }
                                         onSelected={selected => {
                                             merge({
                                                 interests:
                                                     interests.filter(e => selected.includes(e.key))
                                             } as never)
                                         }}
                        />

                        <SectionTitle label="Your languages"/>
                        <SelectableItems style={{display: "block"}}
                                         items={
                                             languages.map(language => ({
                                                 key: language.key,
                                                 name: language.label,
                                             }))
                                         }
                                         selected={
                                             (profile?.languages || []).map(language => language.key)
                                         }
                                         onSelected={selected => {
                                             merge({
                                                 languages: languages.filter(e => selected.includes(e.key))
                                             } as never)
                                         }}
                        />

                        <SectionTitle label="Your programming languages"/>
                        <SelectableItems style={{display: "block"}}
                                         items={
                                             programmingLanguages.map(language => ({
                                                 key: language.key,
                                                 name: language.label,
                                             }))
                                         }
                                         selected={
                                             (profile?.programmingLanguages || []).map(language => language.key)
                                         }
                                         onSelected={selected => {
                                             merge({
                                                 programmingLanguages:
                                                     programmingLanguages.filter(e => selected.includes(e.key))
                                             } as never);
                                         }}/>
                    </div>
                    <div key="Objectives">
                        <ObjectiveList list={objectives}/>
                    </div>
                </TabbedWindow>
            </div>
        </CmWindow>;
    });

export default ProfileView;