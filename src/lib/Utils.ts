
export const Utils = {
    formatTimeSeconds: (time: string) => {
        let seconds = parseFloat(time);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds - (hours * 3600)) / 60);
        const remainingSeconds = seconds - (hours * 3600) - (minutes * 60);

        // Pad the numbers to two digits with leading zeros
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds.toFixed(0)).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    ,
    formatBytes(bytes: number, decimalPlaces = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimalPlaces < 0 ? 0 : decimalPlaces;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    formatData(used: number, total: number, decimalPlaces = 2) {
        // Get the unit for total size
        const unit = Utils.formatBytes(total, decimalPlaces).split(' ')[1];

        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];


        // Convert both used and total to that unit
        const usedInUnit = (used / Math.pow(1024, sizes.indexOf(unit))).toFixed(decimalPlaces);
        const totalInUnit = (total / Math.pow(1024, sizes.indexOf(unit))).toFixed(decimalPlaces);

        return `${usedInUnit}/${totalInUnit}${unit}`;
    },

   
}