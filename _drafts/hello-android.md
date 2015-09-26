

My girlfriend asked me a custom android app.

## Get the emulator working

Find here how to [setup Intel HAXM](https://software.intel.com/en-us/videos/setting-up-intel-haxm-on-windows), in short you need to:

* Enable Intel virtualiztion technology in your BIOS
* Launch Android SDK as administrator and install *Intel x86 emulator accellerator*
* Navigate to folder `%APPDATA%\..\Local\Android\sdk\extras\intel\Hardware_Accelerated_Execution_Manager` (paste it in explorer) and run manually intelhaxm-android.exe
