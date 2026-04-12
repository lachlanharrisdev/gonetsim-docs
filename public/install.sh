#!/bin/sh
set -eu

REPO="lachlanharrisdev/gonetsim"
INSTALL_DIR=${INSTALL_DIR:-/usr/local/bin}

need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing dependency: $1"; exit 1; }; }
dl() {
    url="$1"; out="$2"
    if command -v curl >/dev/null 2>&1; then
        curl -fL --retry 3 --retry-delay 1 -o "$out" "$url"
    elif command -v wget >/dev/null 2>&1; then
        wget -O "$out" "$url"
    else
        echo "Missing dependency: curl or wget"
        exit 1
    fi
}

[ "$(uname -s)" = "Linux" ] || { echo "Linux only."; exit 1; }

SUDO=""
if [ "$(id -u)" -ne 0 ]; then
    need sudo
    SUDO="sudo"
fi

need tar; need mktemp; need find; need awk; need sha256sum; need install; need setcap

arch="$(uname -m)"
case "$arch" in
    x86_64|amd64) arch="x86_64";;
    i386|i686) arch="i386";;
    aarch64|arm64) arch="arm64";;
    *) echo "No precompiled binary available for architecture: $arch"; exit 1;;
esac

asset="GoNetSim_Linux_${arch}.tar.gz"
base="https://github.com/${REPO}/releases/latest/download"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

tgz="$tmp/$asset"
sums="$tmp/checksums.txt"
dl "$base/$asset" "$tgz"
dl "$base/checksums.txt" "$sums"

sum="$(awk -v n="$asset" '$2==n||$2=="./"n{print $1; exit}' "$sums" 2>/dev/null || true)"
[ -n "$sum" ] || { echo "No checksum found for $asset"; exit 1; }
echo "$sum  $tgz" | sha256sum -c -

tar -xzf "$tgz" -C "$tmp"

bin="$tmp/GoNetSim"
[ -f "$bin" ] || bin="$tmp/gonetsim"
if [ ! -f "$bin" ]; then
    bin="$(find "$tmp" -maxdepth 3 -type f \( -name GoNetSim -o -name gonetsim \) -print -quit 2>/dev/null || true)"
fi
[ -n "$bin" ] && [ -f "$bin" ] || { echo "Could not find GoNetSim binary in the extracted archive."; exit 1; }

$SUDO install -d "$INSTALL_DIR"
$SUDO install -m 0755 "$bin" "$INSTALL_DIR/gonetsim"

if ! $SUDO setcap 'cap_net_bind_service=+ep' "$INSTALL_DIR/gonetsim"; then
    echo "Failed to set capabilities (fallback: run as root or use ports >=1024)."
    exit 1
fi

echo "Installed: $INSTALL_DIR/gonetsim"
echo "Usage: https://gonetsim.lachlanharris.dev/guides/usage"
echo "TLS:   https://gonetsim.lachlanharris.dev/reference/tls"