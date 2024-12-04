import React, { useState } from "react";
import {
  Avatar,
  Text,
  Toggle,
  Grid,
  Spacer,
  Modal,
  Input,
  Divider,
  Tabs
} from "@geist-ui/core";
import * as Icon from "@geist-ui/icons";

/* Internal Imports */
import "../styles/Header.css";
import FlashSuiteIcon from "./FlashSuiteIcon";
import {
  Avatars,
  saveUserData,
  handleAvatarUpload,
  validateUserData,
} from "../services/userService";

const Header = ({ user, setUser, toggleTheme, currentTheme }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [selectedAvatar, setSelectedAvatar] = useState(
    user.selectedAvatar || "avatar1"
  );
  const [uploadedAvatar, setUploadedAvatar] = useState(
    user.selectedAvatar === "upload" ? user.avatar : null
  );
  const [avatarError, setAvatarError] = useState(false);

  const openModal = () => {
    setSelectedAvatar(user.selectedAvatar || "avatar1");
    if (user.selectedAvatar === "upload") {
      setUploadedAvatar(user.avatar);
    }
    setIsModalOpen(true);
  };

  const handleAvatarSelection = async (type, file = null) => {
    if (type === "upload") {
      try {
        const uploaded = await handleAvatarUpload(file);
        setUploadedAvatar(uploaded);
        setSelectedAvatar("upload");
        setAvatarError(false);
      } catch (error) {
        setAvatarError(true);
        console.error("Error uploading avatar:", error);
      }
    } else {
      setSelectedAvatar(type);
    }
  };

  const handleSave = () => {
    try {
      const avatarToSave =
        selectedAvatar === "upload" ? uploadedAvatar : Avatars[selectedAvatar];

      validateUserData(nickname, avatarToSave, selectedAvatar);
      const updatedUser = saveUserData(nickname, avatarToSave, selectedAvatar);
      setUser(updatedUser);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving user data:", error.message);
    }
  };

  return (
    <header className="app-header">
      <Grid.Container justify="space-between" alignItems="center">
        {/* Logo */}
        <Grid>''
          <div className="header-logo">
            <FlashSuiteIcon
              width="50px"
              height="50px"
              currentTheme={currentTheme}
            />
            <Spacer w={0.5} />
            <Text h2 style={{ margin: 0 }}>
              Flash Suite
            </Text>
          </div>
        </Grid>

        {/* User Section */}
        <Grid className="user-header-section">
          <div className="header-user" onClick={() => setIsModalOpen(true)}>
            <Avatar src={user.avatar} alt="User Avatar" text={user.nickname} />
            <Text>
              Hi, <strong>{user.nickname}</strong>
            </Text>
            <Icon.Edit
              className="user-edit"
              size={18}
              style={{ marginLeft: "5px" }}
            />
          </div>
          <div className="header-theme-switch">
            <Icon.Sun size={18} />
            <Spacer w={0.2} />
            <Toggle
              style={{ marginBottom: "3px" }}
              checked={currentTheme === "dark"}
              onChange={toggleTheme}
            />
            <Spacer w={0.2} />
            <Icon.Moon size={18} />
          </div>
        </Grid>
      </Grid.Container>

      {/* Theme Toggle */}
      <Grid.Container
        justify="center"
        style={{ marginTop: "10px" }}
      ></Grid.Container>

      {/* Modal */}
      <Modal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        keyboard
      >
        <Modal.Title style={{ textTransform: "none" }}>
          <b>This is your profile</b>
        </Modal.Title>
        <Modal.Subtitle style={{ textTransform: "none", fontSize: "18px" }}>
          Edit whatever you want!
        </Modal.Subtitle>
        <Modal.Content>
          <Tabs initialValue="1" hideDivider align="center">
            {/* User Info Tab */}
            <Tabs.Item
              label={
                <>
                  <Icon.User />
                  User Info
                </>
              }
              value="1"
            >
              <Input
                label="@"
                width="100%"
                initialValue={nickname}
                clearable
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
              />
              <Divider />
              <div className="avatar-container-header">
                {/* Avatar Default 1 */}
                <div
                  className={`avatar-circle-header ${
                    selectedAvatar === "avatar1" ? "selected" : ""
                  }`}
                  onClick={() => handleAvatarSelection("avatar1")}
                >
                  <img src={Avatars.avatar1} alt="Avatar 1" />
                </div>

                {/* Avatar Default 2 */}
                <div
                  className={`avatar-circle-header ${
                    selectedAvatar === "avatar2" ? "selected" : ""
                  }`}
                  onClick={() => handleAvatarSelection("avatar2")}
                >
                  <img src={Avatars.avatar2} alt="Avatar 2" />
                </div>

                {/* Uploaded Avatar */}
                <div
                  className={`avatar-circle-header ${
                    selectedAvatar === "upload" ? "selected" : ""
                  }`}
                  onClick={() =>
                    document.getElementById("upload-avatar").click()
                  }
                >
                  {uploadedAvatar ? (
                    <div className="uploaded-avatar-container-header">
                      <img
                        src={uploadedAvatar}
                        alt="Uploaded Avatar"
                        className="uploaded-avatar-image-header"
                      />
                      <div className="uploaded-avatar-overlay-header">
                        <Icon.Upload size={20} style={{ color: "#fff" }} />
                      </div>
                    </div>
                  ) : (
                    <Icon.Upload size={20} />
                  )}
                  <input
                    id="upload-avatar"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleAvatarSelection("upload", e.target.files[0])
                    }
                  />
                </div>
              </div>
              {avatarError && (
                <Text small style={{ color: "red", marginTop: "10px" }}>
                  Failed to upload avatar. Please try again.
                </Text>
              )}
            </Tabs.Item>

            {/* User Preferences Tab */}
            <Tabs.Item
              style={{ width: "50% !important" }}
              label={
                <>
                  <Icon.Settings />
                  Settings
                </>
              }
              value="2"
            >
              <Text>
                This is the user preferences section. Add your content here!
              </Text>
            </Tabs.Item>
          </Tabs>
        </Modal.Content>
        <Modal.Action passive onClick={() => setIsModalOpen(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={handleSave}>Save Changes</Modal.Action>
      </Modal>
    </header>
  );
};

export default Header;
