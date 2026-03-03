!define MUI_PRODUCT_NAME "Shop Guard - The Floating Ledger"
!define MUI_PRODUCT_VERSION "1.0.0"
!define MUI_PRODUCT_PUBLISHER "Your Company Name"
!define MUI_PRODUCT_Copyright "Copyright © 2023 Your Company Name"

!include "MUI2.nsh"

Name "${MUI_PRODUCT_NAME} ${MUI_PRODUCT_VERSION}"
OutFile "ShopGuardInstaller.exe"
InstallDir "$PROGRAMFILES\Shop Guard - The Floating Ledger"
RequestExecutionLevel admin

!define NSIS_UNICODE

Section "MainSection" SEC01
    SetOutPath "$INSTDIR"
    File /r "${NSIS_SOURCE_DIR}\..\src\*.*"
    File /r "${NSIS_SOURCE_DIR}\..\src-tauri\*.*"
    File /r "${NSIS_SOURCE_DIR}\..\migrations\*.*"
    File /r "${NSIS_SOURCE_DIR}\..\installer\*.*"
    File /r "${NSIS_SOURCE_DIR}\..\scripts\*.*"
    File /r "${NSIS_SOURCE_DIR}\..\README.md"
    File /r "${NSIS_SOURCE_DIR}\..\LICENSE"
    File /r "${NSIS_SOURCE_DIR}\..\package.json"
    File /r "${NSIS_SOURCE_DIR}\..\tsconfig.json"
    File /r "${NSIS_SOURCE_DIR}\..\tauri.conf.json"
    File /r "${NSIS_SOURCE_DIR}\..\Cargo.toml"
    
    CreateShortcut "$DESKTOP\${MUI_PRODUCT_NAME}.lnk" "$INSTDIR\ShopGuard.exe"
    CreateShortcut "$STARTMENU\${MUI_PRODUCT_NAME}.lnk" "$INSTDIR\ShopGuard.exe"
SectionEnd

Section "Uninstall"
    Delete "$INSTDIR\ShopGuard.exe"
    Delete "$DESKTOP\${MUI_PRODUCT_NAME}.lnk"
    Delete "$STARTMENU\${MUI_PRODUCT_NAME}.lnk"
    RMDir /r "$INSTDIR"
SectionEnd

Function .onInit
    !insertmacro MUI_PAGE_WELCOME
    !insertmacro MUI_PAGE_LICENSE "${NSIS_SOURCE_DIR}\..\LICENSE"
    !insertmacro MUI_PAGE_DIRECTORY
    !insertmacro MUI_PAGE_INSTFILES
    !insertmacro MUI_PAGE_FINISH
FunctionEnd

Function .onInstSuccess
    Exec "$INSTDIR\ShopGuard.exe"
FunctionEnd

Function .onUninstSuccess
    MessageBox MB_OK "Uninstallation completed successfully."
FunctionEnd

!insertmacro MUI_LANGUAGE "English"