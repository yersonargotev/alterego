1.  **Key Information Extraction:**
    *   Project Name: display-switch
    *   Description: "Turn a $30 USB switch into a full-featured multi-monitor KVM switch"
    *   Main Features:
        *   Turns a simple USB switch into a multi-monitor KVM switch.
        *   Watches for USB device connect/disconnect events.
        *   Switches monitor inputs via DDC/CI.
        *   Requires installation on all connected computers.
        *   Supports running external commands on USB connect/disconnect events.
        *   Supports configuration via a configuration file (TOML format).
        *   Supports identifying monitors by substring of their ID.
        *   Supports specifying inputs to switch to based on USB device connected/disconnected.

2.  **Project Purpose:**
    The project's purpose is to provide a software-based solution to emulate the functionality of a multi-monitor KVM switch using an inexpensive USB switch and DDC/CI for monitor input switching. This allows users with multiple computers and monitors to control them with a single keyboard and mouse (connected via the USB switch) and automatically switch the monitor inputs when the USB switch is toggled between computers.

3.  **Brainstorm Potential Alternative Tools:**
    *   Hardware KVM switches (traditional approach).
    *   Software KVMs (sharing keyboard/mouse over the network).
    *   Remote desktop software (different use case, but can control multiple machines).
    *   Monitor control utilities (for DDC/CI, but not integrated with a KVM function).

4.  **Research and List Alternative Tools:**

    *   **Synergy:**
        *   Name: Synergy
        *   Licensing: Proprietary (Historically open source, now paid)
        *   Platforms: Windows, macOS, Linux
        *   Main Features: Share keyboard and mouse over the network, seamless switching by moving mouse to screen edge, shared clipboard, drag and drop files, cross-platform compatibility, optional encryption.
        *   Website URL: https://symless.com/synergy

    *   **Mouse Without Borders:**
        *   Name: Mouse Without Borders
        *   Licensing: Proprietary (Microsoft Garage project, free)
        *   Platforms: Windows
        *   Main Features: Control up to four computers with one keyboard and mouse, share clipboard, drag and drop files, customize shortcuts, connect via security code or IP.
        *   Website URL: https://www.microsoft.com/en-us/garage/wall-of-fame/mouse-without-borders/

    *   **ShareMouse:**
        *   Name: ShareMouse
        *   Licensing: Freemium (Free for personal use, paid for commercial/pro features)
        *   Platforms: Windows, macOS
        *   Main Features: Share keyboard and mouse over the network, drag and drop files and folders, clipboard syncing, automatic configuration, works in any direction, password protection and encryption.
        *   Website URL: https://www.sharemouse.com/

    *   **InputLeap:**
        *   Name: InputLeap
        *   Licensing: Open Source (Fork of Barrier, which was a fork of Synergy)
        *   Platforms: Windows, macOS, Linux (actively maintained)
        *   Main Features: Share keyboard and mouse over the network, cross-platform, clipboard sharing, actively developed.
        *   Website URL: https://github.com/inputleap/inputleap (Primary presence is GitHub)

    *   **Hardware KVM Switches:**
        *   Name: Various (e.g., ATEN, IOGEAR, StarTech, Belkin, Level1Techs)
        *   Licensing: Proprietary (Hardware purchase)
        *   Platforms: Hardware device, works with various OS depending on connectivity.
        *   Main Features: Physical switching of Keyboard, Video, and Mouse signals between multiple computers, dedicated ports for peripherals and monitors, various connectivity options (HDMI, DisplayPort, USB, etc.).
        *   Website URL: Varies by brand and retailer (e.g., https://www.aten.com/, https://www.iogear.com/, https://www.startech.com/, https://www.belkin.com/)

5.  **Most Well-Known or Widely Used Alternative:**
    Based on general awareness and search results, **Synergy** appears to be one of the most well-known software KVM solutions, despite its transition to a proprietary model. Among hardware KVMs, brands like **ATEN** and **IOGEAR** are widely recognized. Since the original project is a software solution augmenting a simple hardware switch, **Synergy** and **Mouse Without Borders** are likely the most direct and well-known software competitors in the general user space. **Hardware KVM switches** as a category are also very well-known, representing the traditional approach the project aims to provide an alternative to.

    Listing both Synergy and Hardware KVM Switches covers the most prominent alternatives in both software and hardware categories.

6.  **Market Positioning Analysis:**
    'display-switch' positions itself as a cost-effective alternative to traditional, often expensive, multi-monitor hardware KVM switches. By leveraging an inexpensive USB switch (stated as ~$30) and software control of monitor inputs via DDC/CI, it targets users who need to switch multiple displays along with keyboard and mouse but want to avoid the higher cost and potentially complex cabling of dedicated multi-monitor KVM hardware. Its key differentiator from software-only KVMs (like Synergy or Mouse Without Borders) is its ability to switch *monitor inputs* automatically, which those tools typically do not handle. Software KVMs only share keyboard and mouse across existing display setups. 'display-switch' bridges the gap between software KVM convenience (single keyboard/mouse) and hardware KVM functionality (switching displays) using minimal and affordable hardware. Its reliance on DDC/CI means monitor compatibility is a factor, which is a potential limitation compared to dedicated hardware KVMs that handle video signals directly.

7.  **Expanded Description based on Market Positioning:**
    Display-switch is an open-source utility written in Rust that transforms an affordable USB switch into a comprehensive multi-monitor KVM solution. Unlike traditional, often costly, hardware KVM switches, display-switch utilizes software to automatically switch monitor inputs via DDC/CI commands based on which computer is currently active via the USB switch. This allows users to control multiple computers and their associated displays using a single keyboard and mouse connected through a simple USB switch, eliminating the need for manual monitor input selection. It is designed to be installed on all connected computers, enabling seamless switching of both USB devices and monitor inputs when the user toggles the USB switch. The project offers a cost-effective and software-augmented approach to achieve multi-monitor KVM functionality.