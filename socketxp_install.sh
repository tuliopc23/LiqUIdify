#!/bin/bash
#-------------------------------------------------
#  SocketXP IoT Agent Installation Script
#-------------------------------------------------

printUsage() {
    echo "Usage: "
    echo "$0 -a <auth-token> [ -r <region> ] [ -n <device-name> ] [ -g <device-group> ] [ -p <platform> ] [ -l <local-destination> ] [ -s <subdomain-prefix> ]"
    echo ""
    echo "Note:"
    echo "Command argument auth-token is mandatory.  All other arguments are optional."
    echo "Acceptable platform values: [ amd64, arm, arm64 ]" 
    echo "Acceptable region values: [ eu, au ].  Default region: us-central" 
}

SOCKETXP_BIN_DIR="/usr/local/bin"
SOCKETXP_CONFIG_DIR="/etc/socketxp"
SOCKETXP_LIB_DIR="/var/lib/socketxp"

# Validate command line args
if [ $# -lt 1 ]; then
    printUsage
    exit
fi

while getopts 'a:n:g:p:l:s:r:' opt; do
    case $opt in
        a) authtoken=$OPTARG
        ;;
        n) device_name=$OPTARG
        ;;
        g) device_group=$OPTARG
        ;;
        p) platform=$OPTARG
        ;;
        l) local_dest=$OPTARG
        ;;
        s) subdomain_prefix=$OPTARG
        ;;
        r) region=$OPTARG
        ;;
        ?) echo "Error: Invalid command option"; printUsage; exit 1 
        ;;
    esac
done


if [ -z $authtoken ]; then
    echo "Error: authtoken is missing in the command argument."
    echo ""
    printUsage
    exit
fi

# validate region input provided.
if [ ! -z $region ]; then
    if [ "$region" != "eu" ] && [ "$region" != "au" ] && [ "$region" != "" ]; then
            echo "Error: Please provide a valid region."
            printUsage
            exit
    fi 
fi

if [ ! -z $local_dest ]; then
    if [[ "$local_dest" == *"http"* ]]; then
        if [ -z $subdomain_prefix ]; then
            echo "Error: Please provide a subdomain prefix for your HTTP Service's Public URL"
            exit
        elif [[ "$subdomain_prefix" != *"-"* ]]; then
            echo "Error: subdomain prefix value must contain a hyphen(-)"
            exit
        fi
    fi
fi

setPlatform() {

    if [ ! -z $platform ] && [ "$platform" != "amd64" ] && [ "$platform" != "arm" ] \
                    && [ "$platform" != "arm64" ]; then
        echo "### Invalid value for platform argument"
        printUsage
        exit 
    fi
    
    if [ -z $platform ]; then
        output=$(uname -m) 
        if [ "$output" == "x86_64" ]; then
            platform="amd64"
        elif [ "$output" == "aarch64" ] || [ "$output" == "arm64" ]; then
            platform="arm64"
        else
            platform="arm"
        fi
    else
        platform=$platform
    fi
}

# Invoke setPlatform()
setPlatform $*

echo "+++ Downloading and installing Linux $platform version binary"
if [ ! -z $region ]; then
    curl -LO https://portal.$region.socketxp.com/download/linux/$platform/socketxp
else 
    curl -LO https://portal.socketxp.com/download/linux/$platform/socketxp
fi

if [ $? -eq 0 ]; then
    echo "+++ SocketXP Download Completed."
else 
    echo "### Error: SocketXP download failed!"
    exit 
fi

chmod +wx socketxp
sudo mv socketxp $SOCKETXP_BIN_DIR

if [ $? -eq 0 ]; then
    echo "+++ SocketXP Install Completed."
else 
    echo "### Error: SocketXP install failed!"
    exit 
fi

if [ -z $local_dest ]; then
    config="{
        \"region\": \"$region\",   
        \"tunnels\" : [{
            \"destination\": \"tcp://127.0.0.1:22\"
        }]
    }"
else
    if [[ "$local_dest" == *"http"* ]]; then
        config="{
            \"region\": \"$region\",   
            \"tunnels\" : [{
                \"destination\": \"$local_dest\",
                \"custom_domain\": \"\",
                \"subdomain\": \"$subdomain_prefix\"
            }]
        }"
    fi

    if [[ "$local_dest" == *"tcp"* ]]; then
 
        config="{
            \"region\": \"$region\",   
            \"tunnels\" : [{
                \"destination\": \"$local_dest\"     
            }]
        }"
    fi
fi

# Write config to file
sudo mkdir -p $SOCKETXP_LIB_DIR
sudo mkdir -p $SOCKETXP_CONFIG_DIR
sudo echo $config > $SOCKETXP_CONFIG_DIR/config.json

# Login to SocketXP Gateway using authtoken
LOGIN_CMD="$SOCKETXP_BIN_DIR/socketxp login $authtoken"

if [ ! -z $region ]; then
    LOGIN_CMD+=" --region $region"
fi

if [ ! -z $device_name ]; then
    LOGIN_CMD+=" --iot-device-name $device_name" 
fi

if [ ! -z $device_group ]; then
    LOGIN_CMD+=" --iot-device-group $device_group"
fi


$LOGIN_CMD
if [ $? -eq 0 ]; then
    echo "+++ SocketXP Login Completed"
else 
    echo "### Error: SocketXP login failed!"
    exit 
fi

# Configure and run SocketXP agent as a linux systemd daemon service
sudo $SOCKETXP_BIN_DIR/socketxp service install --config $SOCKETXP_CONFIG_DIR/config.json
if [ $? -eq 0 ]; then
    echo "+++ SocketXP Service Install Completed"
else 
    echo "### Error: SocketXP Service Install failed!"
    exit 
fi

sudo systemctl daemon-reload
if [ $? -eq 0 ]; then
    echo "+++ SocketXP Service Daemon-Reload Completed"
else 
    echo "### Error: SocketXP Service daemon-reload failed!"
    exit 
fi

sudo systemctl start socketxp
if [ $? -eq 0 ]; then
    echo "+++ SocketXP Service Kickstarted"
else 
    echo "### Error: SocketXP Service start failed!"
    exit 
fi

# Enable socketxp service to start always on reboot.
sudo systemctl enable socketxp
if [ $? -eq 0 ]; then
    echo "+++ Enabled SocketXP Service to start always on reboot"
else 
    echo "### Error: SocketXP Service enable failed!"
    exit 
fi
