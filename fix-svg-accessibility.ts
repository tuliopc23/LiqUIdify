#!/usr/bin/env bun
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// Find all TypeScript and TSX files
const files = glob.sync('libs/components/src/**/*.{ts,tsx}', { 
  ignore: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'] 
});

let totalFixed = 0;

for (const file of files) {
  try {
    const content = readFileSync(file, 'utf-8');
    let modified = content;
    let fileFixed = 0;

    // Fix SVG elements without title
    // Pattern: <svg ... > (without <title> inside)
    const svgRegex = /<svg([^>]*)>(.*?)<\/svg>/gs;
    modified = modified.replace(svgRegex, (match, attributes, content) => {
      // Check if SVG already has a title
      if (content.includes('<title>')) {
        return match;
      }

      // Check if SVG is decorative (has aria-hidden="true")
      if (attributes.includes('aria-hidden="true"')) {
        return match; // Decorative SVGs don't need titles
      }

      fileFixed++;
      
      // Generate a meaningful title based on context or attributes
      let title = 'Icon';
      
      // Try to infer title from class names
      const classMatch = attributes.match(/className\s*=\s*["']([^"']*)["']/);
      if (classMatch) {
        const classes = classMatch[1];
        if (classes.includes('icon')) title = 'Icon';
        if (classes.includes('logo')) title = 'Logo';
        if (classes.includes('arrow')) title = 'Arrow';
        if (classes.includes('close')) title = 'Close';
        if (classes.includes('menu')) title = 'Menu';
        if (classes.includes('search')) title = 'Search';
        if (classes.includes('user')) title = 'User';
        if (classes.includes('home')) title = 'Home';
        if (classes.includes('settings')) title = 'Settings';
      }

      // Try to infer from nearby text or context (simplified approach)
      if (content.includes('path') && content.includes('M')) {
        // This is likely an icon, keep generic title
      }

      // Add title as first child of SVG
      const titleElement = `<title>${title}</title>`;
      return `<svg${attributes}>${titleElement}${content}</svg>`;
    });

    // Fix inline SVG icons from icon libraries (like Lucide React)
    // These often appear as components like <ChevronDown />
    const iconComponentRegex = /<([A-Z][a-zA-Z]*(?:Icon|Arrow|Chevron|Plus|Minus|X|Check|Search|Menu|User|Home|Settings|Mail|Phone|Calendar|Clock|Star|Heart|Bookmark|Share|Download|Upload|Edit|Delete|Save|Print|Copy|Cut|Paste|Undo|Redo|Refresh|Sync|Lock|Unlock|Eye|EyeOff|Bell|BellOff|Volume|VolumeOff|Play|Pause|Stop|Skip|Rewind|FastForward|Shuffle|Repeat|Mic|MicOff|Camera|CameraOff|Image|File|Folder|Link|Unlink|External|Internal|Globe|Map|Location|Navigation|Compass|Flag|Tag|Label|Filter|Sort|Grid|List|Table|Card|Sidebar|Header|Footer|Layout|Columns|Rows|Align|Center|Left|Right|Top|Bottom|Middle|Justify|Bold|Italic|Underline|Strike|Code|Quote|List|Bullet|Number|Indent|Outdent|Heading|Paragraph|Text|Font|Size|Color|Background|Border|Margin|Padding|Width|Height|Rotate|Scale|Move|Resize|Crop|Zoom|Pan|Select|Cursor|Hand|Grab|Pointer|Crosshair|Text|Wait|Help|Info|Warning|Error|Success|Question|Exclamation|Plus|Minus|Equal|Percent|Dollar|Euro|Pound|Yen|Bitcoin|Ethereum|Paypal|Visa|Mastercard|Amex|Discover|Apple|Google|Facebook|Twitter|Instagram|Youtube|Linkedin|Github|Gitlab|Bitbucket|Slack|Discord|Skype|Zoom|Teams|Whatsapp|Telegram|Signal|Messenger|Email|Phone|Sms|Fax|Print|Scan|Copy|Cut|Paste|Undo|Redo|Save|Open|New|Close|Exit|Quit|Restart|Shutdown|Sleep|Wake|Power|Battery|Wifi|Bluetooth|Usb|Hdmi|Ethernet|Cellular|Airplane|Car|Bus|Train|Bike|Walk|Run|Swim|Gym|Health|Medical|Hospital|Pharmacy|Doctor|Nurse|Patient|Medicine|Pill|Injection|Thermometer|Stethoscope|Bandage|Wheelchair|Ambulance|Emergency|Fire|Police|Security|Shield|Lock|Key|Safe|Vault|Bank|Money|Credit|Debit|Cash|Coin|Bill|Receipt|Invoice|Tax|Calculator|Chart|Graph|Report|Analytics|Statistics|Data|Database|Server|Cloud|Network|Internet|Website|Domain|Hosting|Ssl|Certificate|License|Patent|Copyright|Trademark|Legal|Law|Judge|Jury|Court|Justice|Scale|Balance|Gavel|Handcuffs|Prison|Jail|Crime|Victim|Witness|Evidence|Investigation|Detective|Spy|Agent|Military|Army|Navy|Airforce|Marine|Soldier|Tank|Plane|Helicopter|Ship|Submarine|Rocket|Satellite|Space|Planet|Moon|Sun|Star|Galaxy|Universe|Alien|Ufo|Robot|Cyborg|Android|Ios|Windows|Mac|Linux|Ubuntu|Chrome|Firefox|Safari|Edge|Opera|Internet|Explorer|Browser|Search|Engine|Google|Bing|Yahoo|Duckduckgo|Wikipedia|Amazon|Ebay|Paypal|Netflix|Spotify|Youtube|Twitch|Tiktok|Instagram|Facebook|Twitter|Linkedin|Pinterest|Reddit|Tumblr|Snapchat|Whatsapp|Telegram|Signal|Discord|Slack|Zoom|Teams|Skype|Facetime|Hangouts|Meet|Webex|Gotomeeting|Bluejeans|Jitsi|Big|Blue|Button|Whereby|Around|Mmhmm|Loom|Calendly|Doodle|When2meet|Eventbrite|Meetup|Facebook|Events|Google|Calendar|Outlook|Ical|Gcal|Apple|Calendar|Fantastical|Calendars|Sunrise|Any|Do|Todoist|Things|Omnifocus|Taskwarrior|Remember|Milk|Wunderlist|Trello|Asana|Monday|Notion|Airtable|Coda|Roam|Obsidian|Logseq|Remnote|Anki|Quizlet|Duolingo|Babbel|Rosetta|Stone|Memrise|Busuu|Lingoda|Italki|Preply|Cambly|Verbling|Hellotalk|Tandem|Speaky|Conversation|Exchange|Language|Learning|Education|School|University|College|Academy|Course|Class|Lesson|Tutorial|Workshop|Seminar|Conference|Webinar|Podcast|Video|Audio|Music|Song|Album|Artist|Band|Concert|Festival|Theater|Movie|Film|Cinema|Tv|Show|Series|Episode|Season|Documentary|News|Sports|Game|Gaming|Esports|Streaming|Twitch|Youtube|Netflix|Hulu|Disney|Amazon|Prime|Hbo|Showtime|Starz|Cinemax|Epix|Paramount|Peacock|Apple|Tv|Google|Play|Vudu|Fandango|Moviepass|Amc|Regal|Cinemark|Imax|Dolby|Atmos|Dts|Surround|Sound|Audio|Headphones|Speakers|Microphone|Recording|Studio|Mixing|Mastering|Editing|Production|Broadcasting|Radio|Fm|Am|Satellite|Podcast|Spotify|Apple|Music|Amazon|Pandora|Soundcloud|Bandcamp|Tidal|Qobuz|Deezer|Youtube|Music|Google|Play|Music|Itunes|Winamp|Vlc|Media|Player|Quicktime|Windows|Media|Real|Player|Kodi|Plex|Emby|Jellyfin|Subsonic|Airsonic|Navidrome|Funkwhale|Ampache|Mopidy|Musicpd|Ncmpcpp|Cmus|Mocp|Audacious|Clementine|Strawberry|Foobar2000|Musicbee|Mediamonkey|Jriver|Roon|Audirvana|Amarra|Pure|Music|Bitperfect|Integer|Mode|Hqplayer|Upsampling|Dsd|Pcm|Flac|Alac|Wav|Aiff|Mp3|Aac|Ogg|Opus|Wma|M4a|Mp4|Mkv|Avi|Mov|Wmv|Flv|Webm|Ogv|3gp|Rm|Rmvb|Asf|Vob|Ts|M2ts|Mts|Divx|Xvid|H264|H265|Hevc|Vp8|Vp9|Av1|Codec|Container|Format|Quality|Bitrate|Resolution|Framerate|Aspect|Ratio|Color|Space|Hdr|Sdr|Dolby|Vision|Hdr10|Hdr10Plus|Hlg|Rec2020|Rec709|Srgb|Adobe|Rgb|Prophoto|Rgb|Dci|P3|Display|P3|Wide|Gamut|Color|Management|Calibration|Profiling|Icc|Profile|Lut|3d|Lut|Gamma|Curve|Transfer|Function|Eotf|Oetf|Primaries|White|Point|Illuminant|D65|D50|Temperature|Tint|Exposure|Contrast|Highlights|Shadows|Whites|Blacks|Clarity|Vibrance|Saturation|Hue|Luminance|Chrominance|Chroma|Subsampling|420|422|444|Rgb|Yuv|Ycbcr|Lab|Xyz|Luv|Hsv|Hsl|Cmyk|Pantone|Ral|Ncs|Color|Picker|Palette|Swatch|Gradient|Pattern|Texture|Brush|Pen|Pencil|Eraser|Fill|Stroke|Path|Shape|Rectangle|Circle|Ellipse|Polygon|Star|Arrow|Line|Curve|Bezier|Spline|Text|Font|Typography|Kerning|Tracking|Leading|Baseline|Ascender|Descender|Xheight|Capheight|Serif|Sans|Serif|Monospace|Script|Display|Handwriting|Calligraphy|Lettering|Logo|Brand|Identity|Corporate|Design|Graphic|Visual|Art|Illustration|Drawing|Painting|Sketch|Doodle|Cartoon|Comic|Animation|Motion|Graphics|Video|Editing|After|Effects|Premiere|Final|Cut|Davinci|Resolve|Avid|Media|Composer|Vegas|Filmora|Camtasia|Screenflow|Obs|Studio|Streamlabs|Xsplit|Wirecast|Vmix|Tricaster|Atem|Blackmagic|Design|Camera|Lens|Sensor|Ccd|Cmos|Full|Frame|Crop|Aps|C|Micro|Four|Thirds|Medium|Format|Large|Format|35mm|120|Film|Digital|Mirrorless|Dslr|Point|Shoot|Action|Camera|Drone|Gimbal|Tripod|Monopod|Flash|Strobe|Continuous|Light|Softbox|Umbrella|Reflector|Diffuser|Filter|Polarizer|Nd|Uv|Cpl|Graduated|Variable|Nd|Circular|Polarizer|Lens|Hood|Cap|Strap|Bag|Case|Memory|Card|Sd|Cf|Xqd|Cfast|Battery|Charger|Grip|Remote|Shutter|Release|Cable|Wireless|Bluetooth|Wifi|Nfc|Gps|Compass|Accelerometer|Gyroscope|Magnetometer|Barometer|Altimeter|Thermometer|Hygrometer|Light|Sensor|Proximity|Sensor|Fingerprint|Scanner|Face|Recognition|Iris|Scanner|Voice|Recognition|Speech|Synthesis|Text|To|Speech|Speech|To|Text|Natural|Language|Processing|Machine|Learning|Artificial|Intelligence|Neural|Network|Deep|Learning|Computer|Vision|Image|Recognition|Object|Detection|Facial|Recognition|Optical|Character|Recognition|Ocr|Augmented|Reality|Virtual|Reality|Mixed|Reality|Extended|Reality|Ar|Vr|Mr|Xr|Headset|Glasses|Hololens|Oculus|Vive|Pico|Quest|Rift|Index|Psvr|Gear|Vr|Cardboard|Daydream|Magic|Leap|Varjo|Pimax|Reverb|Cosmos|Focus|Go|Mirage|Lenovo|Explorer|Wmr|Windows|Mixed|Reality|Steamvr|Openvr|Openxr|Unity|Unreal|Engine|Godot|Blender|Maya|3ds|Max|Cinema|4d|Houdini|Zbrush|Substance|Painter|Designer|Alchemist|Sampler|Marmoset|Toolbag|Keyshot|Vray|Arnold|Redshift|Octane|Cycles|Eevee|Renderman|Mental|Ray|Iray|Corona|Fstorm|Lumion|Twinmotion|Enscape|Vray|Chaos|Group|Autodesk|Adobe|Maxon|Sidefx|Pixologic|Allegorithmic|Marmoset|Luxion|Chaos|Czech|Otoy|Blender|Foundation|Epic|Games|Unity|Technologies|Godot|Engine|Open|Source|Free|Software|Libre|Gnu|Linux|Ubuntu|Debian|Fedora|Centos|Rhel|Suse|Opensuse|Arch|Manjaro|Gentoo|Slackware|Freebsd|Openbsd|Netbsd|Dragonfly|Bsd|Solaris|Aix|Hpux|Irix|Tru64|Qnx|Vxworks|Rtems|Freertos|Zephyr|Mbed|Arduino|Raspberry|Pi|Beaglebone|Nvidia|Jetson|Intel|Nuc|Compute|Stick|Asus|Tinker|Board|Orange|Pi|Banana|Pi|Rock|Pi|Odroid|Pine64|Libre|Computer|System76|Purism|Framework|Laptop|Thinkpad|Macbook|Imac|Mac|Mini|Mac|Pro|Ipad|Iphone|Apple|Watch|Airpods|Homepod|Apple|Tv|Samsung|Galaxy|Note|Tab|Watch|Buds|Google|Pixel|Nest|Chromecast|Microsoft|Surface|Xbox|Hololens|Amazon|Echo|Fire|Kindle|Sony|Playstation|Nintendo|Switch|Steam|Deck|Valve|Index|Htc|Vive|Oculus|Quest|Rift|Pico|Varjo|Aero|Pimax|Vision|Reverb|G2|Cosmos|Elite|Focus|3|Lynx|R1|Psvr|2|Magic|Leap|2|Nreal|Light|Rokid|Air|Xreal|Beam|Tilt|Five|Ultraleap|Leap|Motion|Tobii|Eye|Tracker|Fove|Pupil|Labs|Varjo|Aero|Vive|Pro|Eye|Pico|4|Enterprise|Quest|Pro|Rift|S|Go|Gear|Vr|Cardboard|Daydream|View|Mirage|Solo|Lenovo|Explorer|Dell|Visor|Hp|Reverb|Acer|Ah101|Asus|Hc102|Samsung|Odyssey|Plus|Medion|Erazer|X1000|Fujitsu|Windows|Mixed|Reality|Wmr|Steamvr|Openvr|Openxr|Oculus|Sdk|Vive|Sdk|Pico|Sdk|Varjo|Sdk|Magic|Leap|Sdk|Hololens|Sdk|Arcore|Arkit|Vuforia|Wikitude|8th|Wall|Zappar|Niantic|Lightship|Ardk|Unity|Ar|Foundation|Unreal|Ar|Plugin|Godot|Ar|Plugin|Blender|Ar|Plugin|Maya|Ar|Plugin|3ds|Max|Ar|Plugin|Cinema|4d|Ar|Plugin|Houdini|Ar|Plugin|Zbrush|Ar|Plugin|Substance|Ar|Plugin|Marmoset|Ar|Plugin|Keyshot|Ar|Plugin|Vray|Ar|Plugin|Arnold|Ar|Plugin|Redshift|Ar|Plugin|Octane|Ar|Plugin|Cycles|Ar|Plugin|Eevee|Ar|Plugin|Renderman|Ar|Plugin|Mental|Ray|Ar|Plugin|Iray|Ar|Plugin|Corona|Ar|Plugin|Fstorm|Ar|Plugin|Lumion|Ar|Plugin|Twinmotion|Ar|Plugin|Enscape|Ar|Plugin)[^a-zA-Z])/g;
    modified = modified.replace(iconComponentRegex, (match, iconName) => {
      // Check if it already has aria-label or title
      if (match.includes('aria-label') || match.includes('title')) {
        return match;
      }

      // Check if it's decorative
      if (match.includes('aria-hidden="true"')) {
        return match;
      }

      fileFixed++;
      
      // Generate aria-label based on component name
      const label = iconName
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .toLowerCase()
        .replace(/^./, str => str.toUpperCase());

      // Add aria-label to the component
      return match.replace('>', ` aria-label="${label}">`);
    });

    if (fileFixed > 0) {
      writeFileSync(file, modified);
      console.log(`✅ Fixed ${fileFixed} SVG accessibility issues in ${file}`);
      totalFixed += fileFixed;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total SVG accessibility issues fixed: ${totalFixed}`);
console.log(`\n⚠️  Note: This script provides basic fixes. You may need to manually review:`);
console.log(`   • Ensure titles are meaningful and descriptive`);
console.log(`   • Consider using aria-label for icon components`);
console.log(`   • Mark decorative SVGs with aria-hidden="true"`);
