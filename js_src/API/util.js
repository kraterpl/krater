krater.API.util = {
    rateComment: function (ups, downs) {
        // The confidence sort.
        // http://www.evanmiller.org/how-not-to-sort-by-average-rating.html
        var n = ups + downs,
            z = 1.281551565545, // 80% confidence
            p, left, right, under, score;
        if (n == 0) return 0;
        p = ups / n;
        left = p + 1/(2*n)*z*z;
        right = z * Math.sqrt(p*(1-p)/n + z*z/(4*n*n));
        under = 1+1/n*z*z;
        score = (left - right) / under;
        return score;
    }
}
