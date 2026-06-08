

function levenshteinDistance(a, b) {

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }


    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }


    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {

            if (b.charAt(i - 1) === a.charAt(j - 1)) {

                matrix[i][j] = matrix[i - 1][j - 1];

            } else {

                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}




function getSuggestions(word) {

    const matches = [];

    dictionary.forEach(item => {

        const distance =
            levenshteinDistance(word, item);

        if (distance <= 2) {
            matches.push({
                word: item,
                distance: distance
            });
        }
    });

    matches.sort((a, b) => a.distance - b.distance);

    return matches.slice(0, 3);
}



function checkSpelling() {

    const text =
        document.getElementById("inputText")
        .value
        .toLowerCase();

    const words = text.match(/\b\w+\b/g);



    let output = "";


    if (!words) {
        output = "Please enter text.";
    } else {

        words.forEach(word => {

            if (!dictionary.includes(word)) {

                const suggestions =
                    getSuggestions(word);

                output += `
                <p>
                    <span class="error">
                        ${word}
                    </span>
                    →
                    <span class="suggestion">
                        ${suggestions
                            .map(s => s.word)
                            .join(", ")}
                    </span>
                </p>`;
            }
        });

        if (output === "") {
            output =
            "<p style='color:green'>No spelling mistakes found.</p>";
        }
    }



    document.getElementById("results")
        .innerHTML = output;
}