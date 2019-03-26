//To Encode the credentials in base64 format.
var B64 = {
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    lookup: null,
    encode: function(s) {
        var buffer = B64.toUtf8(s),
            position = -1,
            len = buffer.length,
            nan0, nan1, nan2, enc = [, , , ];
        var result = [];
        while (++position < len) {
            nan0 = buffer[position];
            nan1 = buffer[++position];
            enc[0] = nan0 >> 2;
            enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
            if (isNaN(nan1)) enc[2] = enc[3] = 64;
            else {
                nan2 = buffer[++position];
                enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
                enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
            }
            result.push(B64.alphabet.charAt(enc[0]), B64.alphabet.charAt(enc[1]), B64.alphabet.charAt(enc[2]), B64.alphabet.charAt(enc[3]));
        }
        return result.join('');
    },
    toUtf8: function(s) {
        var position = -1,
            len = s.length,
            chr, buffer = [];
        if (/^[\x00-\x7f]*$/.test(s))
            while (++position < len) buffer.push(s.charCodeAt(position));
        else
            while (++position < len) {
                chr = s.charCodeAt(position);
                if (chr < 128) buffer.push(chr);
                else if (chr < 2048) buffer.push((chr >> 6) | 192, (chr & 63) | 128);
                else buffer.push((chr >> 12) | 224, ((chr >> 6) & 63) | 128, (chr & 63) | 128);
            }
        return buffer;
    }
};