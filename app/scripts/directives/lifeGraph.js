'use strict';
angular.module('lifegraphApp')
    .directive('graphLife', function() {

    var isSelectingSomething = false;



    var kindNodes = [{
            id: 0,
            name: 'Career',
            color: '#FFF'
        },
        {
            id: 1,
            name: 'Learning',
            color: '#BFE2F3'
        },{
            id: 2,
            name: 'Relationships',
            color: '#F4D4D7'
        },{
            id: 3,
            name: 'Health',
            color: 'red'
        }
        ,{
            id: 4,
            name: 'Health',
            color: '#FEC92F'
        }
    ];
// factors-from-grid


    var nodes = [
            // EDUCATION AND CAREER - KIND 0
       { id:    0   , name: '   Education and Career: start  '  , kind: 3,  css: 'node-birth'   },
{ id:   1   , name: '   Parents went to university   '  , kind: 3,      },
{ id:   2   , name: '   Good primary school, small class size    '  , kind: 3,      },
{ id:   3   , name: '   Good secondary school, mixed, large class size   '  , kind: 3,      },
{ id:   4   , name: '   Good A level grades  '  , kind: 3,      },
{ id:   5   , name: '   Gap year     '  , kind: 3,  css: 'node-optional'    },
{ id:   6   , name: '   Look for work    '  , kind: 3,  css: 'node-optional'    },
 { id:  7   , name: '   Start Law degree     '  , kind: 3,      },
{ id:   8   , name: '   Gained degree    '  , kind: 3,      },
{ id:   9   , name: '   Apprenticeship - respected company   '  , kind: 3,      },
{ id:   10  , name: '   Take any job that pays   '  , kind: 3,  css: 'node-optional'    },
{ id:   11  , name: '   Career break: travel     '  , kind: 3,  css: 'node-optional'    },
{ id:   12  , name: '   Change direction: retrain    '  , kind: 3,  css: 'node-optional'    },
{ id:   13  , name: '   Junior role  '  , kind: 3,      },
 { id:  14  , name: '   Mid level role   '  , kind: 3,      },
{ id:   15  , name: '   Career break: maternity  '  , kind: 3,      },
{ id:   16  , name: '   Lower Management role    '  , kind: 3,  css: 'node-optional'    },
{ id:   17  , name: '   Career: what next?    '  , kind: 3,  css: 'node-now' },
{ id:   18  , name: '   Compete for promotion    '  , kind: 3,  css: 'node-optional'    },
{ id:   19  , name: '   Continue in role     '  , kind: 3,  css: 'node-optional'    },
{ id:   20  , name: '   Career break: travel     '  , kind: 3,  css: 'node-optional'    },
{ id:   21  , name: '   Retrain: new career  '  , kind: 3,  css: 'node-optional'    },
{ id:   22  , name: '   Continue as I am     '  , kind: 3,  css: 'node-option-now'  },
{ id:   23  , name: '   Rejoin part time, same role  '  , kind: 3,  css: 'node-option-now'  },
{ id:   24  , name: '   Rejoin part time, lower level    '  , kind: 3,  css: 'node-option-now'  },
{ id:   25  , name: '   Rejoin full time, same role  '  , kind: 3,  css: 'node-option-now'  },
{ id:   26  , name: '   Extend maternity     '  , kind: 3,  css: 'node-option-now'  },
{ id:   27  , name: '   Change direction: retrain    '  , kind: 3,  css: 'node-option-now'  },
{ id:   28  , name: '   Management   '  , kind: 3,  css: 'node-future'  },
{ id:   29  , name: '   Retirement   '  , kind: 3,  css: 'node-future'  },

// RELATIONSHIPS: family - KIND 1
        { id:   30  , name: '   Relationships: birth     '  , kind: 1,  css: 'node-birth'   },
        { id:   31  , name: '   Parents married: stable  '  , kind: 1,      },
        { id:   32  , name: '   Middle child     '  , kind: 1,      },
        { id:   33  , name: '   Nursery school - enjoyed new people  '  , kind: 1,      },
        { id:   34  , name: '   Primary school - many friends    '  , kind: 1,      },
        { id:   35  , name: '   Secondary school - many friends  '  , kind: 1,      },
        { id:   36  , name: '   Began dating     '  , kind: 1,      },
        { id:   37  , name: '   Strong social life   '  , kind: 1,      },
        { id:   38  , name: '   University: end childhood relationship   '  , kind: 1,      },
        { id:   39  , name: '   University: serious boyfriend    '  , kind: 1,      },
        { id:   40  , name: '   Relationship break   '  , kind: 1,      },
        { id:   41  , name: '   Dating a colleague   '  , kind: 1,      },
        { id:   42  , name: '   Marry    '  , kind: 1,      },
        { id:   43  , name: '   First child  '  , kind: 1,      },
        { id:   44  , name: '   Relationships: what next?  '  , kind: 1,  css: 'node-now' },

// RELATIONSHIPS: OPTIONS NOW
        { id:   45  , name: '   Separate from partner    '  , kind: 1,  css: 'node-optional'    },
        { id:   46  , name: '   Strengthen social life   '  , kind: 1,  css: 'node-optional'    },
        { id:   47  , name: '   Continue as I am     '  , kind: 1,  css: 'node-optional'    },
        { id:   48  , name: '   Have another baby    '  , kind: 1,  css: 'node-optional'    },
        { id:   49  , name: '   Separate from partner    '  , kind: 1,  css: 'node-optional'    },
        { id:   50  , name: '   Parents separated    '  , kind: 1,  css: 'node-optional'    },
        { id:   51  , name: '   Unhappy socially     '  , kind: 1,  css: 'node-optional'    },
        { id:   52  , name: '   Unhappy socially     '  , kind: 1,  css: 'node-optional'    },
        { id:   53  , name: '   Continue as long distance relationship   '  , kind: 1,  css: 'node-optional'    },
        { id:   54  , name: '   Break up     '  , kind: 1,  css: 'node-optional'    },

//  PERSONALITY AND FACTORS
        { id:   55  , name: '   Personality  '  , kind: 0,  css: 'node-main'    },  // main
        { id:   56  , name: '   Cognitive Style  '  , kind: 0,  css: 'node-main'    },  // main
        { id:   57  , name: '   Demographic  '  , kind: 0,  css: 'node-main'    },  // main
        { id:   58  , name: '   Behavioural  '  , kind: 0,  css: 'node-main'    },  // main
        { id:   59  , name: '   Mood     '  , kind: 0,  css: 'node-main'    },  // main
        { id:   60  , name: '   Abilities    '  , kind: 0,  css: 'node-main'    },  // main
        { id:   61  , name: '   Developmental factors    '  , kind: 0,  css: 'node-main'    },  // main
        { id:   62  , name: '   Interests    '  , kind: 0,  css: 'node-main'    },  // main
        { id:   63  , name: '   Attitude     '  , kind: 0,  css: 'node-main'    },  // main
        { id:   64  , name: '   Motivation   '  , kind: 0,  css: 'node-main'    },  // main
        { id:   65  , name: '   The Big Five     '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   66  , name: '   Big Five narrow traits   '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   67  , name: '   Lexical Hypothesis traits beyond the Big Five    '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   68  , name: '   Approach/avoid   '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   69  , name: '   Affectivity  '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   70  , name: '   Attachment Style     '  , kind: 0,  css: 'node-optional  node-factor'    },  // sub
        { id:   71  , name: '   The Dark Tetrad  '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   72  , name: '   Emotional Intelligence   '  , kind: 0,  css: 'node-optional  node-factor'    },  // sub
        { id:   73  , name: '   Rational-Experiential    '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   74  , name: '   Intuitive-analytical     '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   75  , name: '   Maximising   '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   76  , name: '   Study processes  '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   77  , name: '   Learning Modality    '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   78  , name: '   Biological   '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   79  , name: '   Sociological     '  , kind: 0,  css: 'node-optional  node-factor'    },  // sub
        { id:   80  , name: '   Body Language    '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   81  , name: '   Thin slices  '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   82  , name: '   Emotion  '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   83  , name: '   Intelligence     '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   84  , name: '   Soft skills  '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   85  , name: '   Parenting Style  '  , kind: 0,  css: 'node-optional  node-factor'    },  // sub
        { id:   86  , name: '   Birth Order  '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   87  , name: '   Occupational Interests   '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   88  , name: '   Music    '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   89  , name: '   Values   '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   90  , name: '   Regulatory Focus     '  , kind: 0,  css: 'node-optional  node-factor'    },  // sub
        { id:   91  , name: '   Needs    '  , kind: 0,  css: 'node-optional'    },  // sub
        { id:   92  , name: '   Openness     '  , kind: 0,  css: 'node-optional'    },
        { id:   93  , name: '   Conscientiousness    '  , kind: 0,  css: 'node-optional'    },
        { id:   94  , name: '   Extraversion     '  , kind: 0,  css: 'node-optional'    },
        { id:   95  , name: '   Agreeableness    '  , kind: 0,  css: 'node-optional'    },
        { id:   96  , name: '   Neuroticism  '  , kind: 0,  css: 'node-optional  node-factor'    },
        { id:   97  , name: '   N Anxiety    '  , kind: 0,  css: 'node-optional'    },
        { id:   98  , name: '   N Anger  '  , kind: 0,  css: 'node-optional'    },
        { id:   99  , name: '   N Depression     '  , kind: 0,  css: 'node-optional'    },
        { id:   100 , name: '   N Self-Consciousness     '  , kind: 0,  css: 'node-optional'    },
        { id:   101 , name: '   N Immoderation   '  , kind: 0,  css: 'node-optional'    },
        { id:   102 , name: '   N Vulnerability  '  , kind: 0,  css: 'node-optional'    },
        { id:   103 , name: '   E Friendliness   '  , kind: 0,  css: 'node-optional'    },
        { id:   104 , name: '   E Gregariousness     '  , kind: 0,  css: 'node-optional'    },
        { id:   105 , name: '   E Assertiveness  '  , kind: 0,  css: 'node-optional'    },
        { id:   106 , name: '   E Activity Level     '  , kind: 0,  css: 'node-optional'    },
        { id:   107 , name: '   E Excitement-seeking     '  , kind: 0,  css: 'node-optional'    },
        { id:   108 , name: '   E Cheerfulness   '  , kind: 0,  css: 'node-optional'    },
        { id:   109 , name: '   O Imagination    '  , kind: 0,  css: 'node-optional'    },
        { id:   110 , name: '   O Artistic Interests     '  , kind: 0,  css: 'node-optional'    },
        { id:   111 , name: '   O Emotionality   '  , kind: 0,  css: 'node-optional'    },
        { id:   112 , name: '   O Adventurousness    '  , kind: 0,  css: 'node-optional'    },
        { id:   113 , name: '   O Intellect  '  , kind: 0,  css: 'node-optional'    },
        { id:   114 , name: '   O Liberalism     '  , kind: 0,  css: 'node-optional'    },
        { id:   115 , name: '   A Trust  '  , kind: 0,  css: 'node-optional'    },
        { id:   116 , name: '   A Morality   '  , kind: 0,  css: 'node-optional'    },
        { id:   117 , name: '   A Altruism   '  , kind: 0,  css: 'node-optional'    },
        { id:   118 , name: '   A Co-operation   '  , kind: 0,  css: 'node-optional'    },
        { id:   119 , name: '   A Modesty    '  , kind: 0,  css: 'node-optional'    },
        { id:   120 , name: '   A Sympathy   '  , kind: 0,  css: 'node-optional'    },
        { id:   121 , name: '   C Self-Efficacy  '  , kind: 0,  css: 'node-optional'    },
        { id:   122 , name: '   C Orderliness    '  , kind: 0,  css: 'node-optional'    },
        { id:   123 , name: '   C Dutifulness    '  , kind: 0,  css: 'node-optional'    },
        { id:   124 , name: '   C Achievement-Striving   '  , kind: 0,  css: 'node-optional'    },
        { id:   125 , name: '   C Self-Discipline    '  , kind: 0,  css: 'node-optional'    },
        { id:   126 , name: '   C Cautiousness   '  , kind: 0,  css: 'node-optional'    },
        { id:   127 , name: '   Honesty-Humilty  '  , kind: 0,  css: 'node-optional'    },
        { id:   128 , name: '   Religious/devout     '  , kind: 0,  css: 'node-optional'    },
        { id:   129 , name: '   Deceptive/manipulative   '  , kind: 0,  css: 'node-optional'    },
        { id:   130 , name: '   Sexy     '  , kind: 0,  css: 'node-optional'    },
        { id:   131 , name: '   Thrifty/frugal/miserly   '  , kind: 0,  css: 'node-optional'    },
        { id:   132 , name: '   Conservative, traditional, down-to-earth     '  , kind: 0,  css: 'node-optional'    },
        { id:   133 , name: '   Masculine-feminine   '  , kind: 0,  css: 'node-optional'    },
        { id:   134 , name: '   Egotistical/conceited/snobbish   '  , kind: 0,  css: 'node-optional'    },
        { id:   135 , name: '   Humourous/witty/amusing  '  , kind: 0,  css: 'node-optional'    },
        { id:   136 , name: '   Approach/reward focus    '  , kind: 0,  css: 'node-optional'    },
        { id:   137 , name: '   Avoidance/threat focus   '  , kind: 0,  css: 'node-optional'    },
        { id:   138 , name: '   Positive Affect  '  , kind: 0,  css: 'node-optional'    },
        { id:   139 , name: '   Negative Affect  '  , kind: 0,  css: 'node-optional  node-factor'    },
        { id:   140 , name: '   Secure   '  , kind: 0,  css: 'node-optional'    },
        { id:   141 , name: '   Anxious  '  , kind: 0,  css: 'node-optional'    },
        { id:   142 , name: '   Avoidant     '  , kind: 0,  css: 'node-optional'    },
        { id:   143 , name: '   Narcissism   '  , kind: 0,  css: 'node-optional'    },
        { id:   144 , name: '   Machiavellianism     '  , kind: 0,  css: 'node-optional'    },
        { id:   145 , name: '   Sadism   '  , kind: 0,  css: 'node-optional'    },
        { id:   146 , name: '   Psychopathy  '  , kind: 0,  css: 'node-optional'    },
        { id:   147 , name: '   Trait Emotional Intelligence     '  , kind: 0,  css: 'node-optional'    },
        { id:   148 , name: '   Rational thinking    '  , kind: 0,  css: 'node-optional'    },
        { id:   149 , name: '   Experiential thinking    '  , kind: 0,  css: 'node-optional'    },
        { id:   150 , name: '   Intuitive-Analytical  thinking   '  , kind: 0,  css: 'node-optional'    },
        { id:   151 , name: '   Maximising   '  , kind: 0,  css: 'node-optional'    },
        { id:   152 , name: '   Satisficing  '  , kind: 0,  css: 'node-optional'    },
        { id:   153 , name: '   Deep     '  , kind: 0,  css: 'node-optional'    },
        { id:   154 , name: '   Surface  '  , kind: 0,  css: 'node-optional'    },
        { id:   155 , name: '   Achieving    '  , kind: 0,  css: 'node-optional'    },
        { id:   156 , name: '   Visual learning  '  , kind: 0,  css: 'node-optional'    },
        { id:   157 , name: '   Kinaesthetic learning    '  , kind: 0,  css: 'node-optional'    },
        { id:   158 , name: '   Auditory learning    '  , kind: 0,  css: 'node-optional'    },
        { id:   159 , name: '   Age  '  , kind: 0,  css: 'node-optional node-factor'    },
        { id:   160 , name: '   Gender (and birth gender)    '  , kind: 0,  css: 'node-optional node-factor'    },
        { id:   161 , name: '   Sexuality    '  , kind: 0,  css: 'node-optional'    },
        { id:   162 , name: '   Height   '  , kind: 0,  css: 'node-optional'    },
        { id:   163 , name: '   Physical attractiveness  '  , kind: 0,  css: 'node-optional'    },
        { id:   164 , name: '   Ethnicity    '  , kind: 0,  css: 'node-optional'    },
        { id:   165 , name: '   Testosterone     '  , kind: 0,  css: 'node-optional'    },
        { id:   166 , name: '   BMI  '  , kind: 0,  css: 'node-optional'    },
        { id:   167 , name: '   Socioeconomic Status     '  , kind: 0,  css: 'node-optional  node-factor'    },
        { id:   168 , name: '   Country  '  , kind: 0,  css: 'node-optional'    },
        { id:   169 , name: '   Region within country    '  , kind: 0,  css: 'node-optional'    },
        { id:   170 , name: '   Name     '  , kind: 0,  css: 'node-optional'    },
        { id:   171 , name: '   Generation   '  , kind: 0,  css: 'node-optional'    },
        { id:   172 , name: '   Culture  '  , kind: 0,  css: 'node-optional'    },
        { id:   173 , name: '   Group Identification (e.g. punk)     '  , kind: 0,  css: 'node-optional'    },
        { id:   174 , name: '   Wealth   '  , kind: 0,  css: 'node-optional  node-factor'    },
        { id:   175 , name: '   Voice tone   '  , kind: 0,  css: 'node-optional'    },
        { id:   176 , name: '   Accent   '  , kind: 0,  css: 'node-optional'    },
        { id:   177 , name: '   Gestures     '  , kind: 0,  css: 'node-optional'    },
        { id:   178 , name: '   Expressions  '  , kind: 0,  css: 'node-optional'    },
        { id:   179 , name: '   Clothing     '  , kind: 0,  css: 'node-optional'    },
        { id:   180 , name: '   Social network profiles/updates  '  , kind: 0,  css: 'node-optional'    },
        { id:   181 , name: '   Room cues (e.g. messy desk)  '  , kind: 0,  css: 'node-optional'    },
        { id:   182 , name: '   Joy  '  , kind: 0,  css: 'node-optional'    },
        { id:   183 , name: '   Surprise     '  , kind: 0,  css: 'node-optional'    },
        { id:   184 , name: '   Fear     '  , kind: 0,  css: 'node-optional'    },
        { id:   185 , name: '   Disgust  '  , kind: 0,  css: 'node-optional'    },
        { id:   186 , name: '   Contempt     '  , kind: 0,  css: 'node-optional'    },
        { id:   187 , name: '   Sadness  '  , kind: 0,  css: 'node-optional'    },
        { id:   188 , name: '   Anger    '  , kind: 0,  css: 'node-optional'    },
        { id:   189 , name: '   General Intelligence     '  , kind: 0,  css: 'node-optional'    },
        { id:   190 , name: '   Fluid Intelligence   '  , kind: 0,  css: 'node-optional'    },
        { id:   191 , name: '   Crystallised Intelligence    '  , kind: 0,  css: 'node-optional'    },
        { id:   192 , name: '   Verbal Ability   '  , kind: 0,  css: 'node-optional'    },
        { id:   193 , name: '   Logical Ability  '  , kind: 0,  css: 'node-optional'    },
        { id:   194 , name: '   Spatial Ability  '  , kind: 0,  css: 'node-optional'    },
        { id:   195 , name: '   Numerical Ability    '  , kind: 0,  css: 'node-optional'    },
        { id:   196 , name: '   Ability Emotional Intelligence   '  , kind: 0,  css: 'node-optional'    },
        { id:   197 , name: '   Practical intelligence   '  , kind: 0,  css: 'node-optional'    },
        { id:   198 , name: '   Social intelligence  '  , kind: 0,  css: 'node-optional'    },
        { id:   199 , name: '   Authoritative    '  , kind: 0,  css: 'node-optional'    },
        { id:   200 , name: '   Authoritarian    '  , kind: 0,  css: 'node-optional'    },
        { id:   201 , name: '   Permissive   '  , kind: 0,  css: 'node-optional'    },
        { id:   202 , name: '   Only child   '  , kind: 0,  css: 'node-optional'    },
        { id:   203 , name: '   Youngest     '  , kind: 0,  css: 'node-optional'    },
        { id:   204 , name: '   Middle   '  , kind: 0,  css: 'node-optional'    },
        { id:   205 , name: '   Oldest   '  , kind: 0,  css: 'node-optional'    },
        { id:   206 , name: '   Realistic Interests  '  , kind: 0,  css: 'node-optional'    },
        { id:   207 , name: '   Artistic Interests   '  , kind: 0,  css: 'node-optional'    },
        { id:   208 , name: '   Investigative Interests  '  , kind: 0,  css: 'node-optional'    },
        { id:   209 , name: '   Social Interests     '  , kind: 0,  css: 'node-optional'    },
        { id:   210 , name: '   Entrepreneurial Interests    '  , kind: 0,  css: 'node-optional'    },
        { id:   211 , name: '   Conventional Interests   '  , kind: 0,  css: 'node-optional'    },
        { id:   212 , name: '   Intense and Rebellious music     '  , kind: 0,  css: 'node-optional'    },
        { id:   213 , name: '   Rhythmic and Energetic music     '  , kind: 0,  css: 'node-optional'    },
        { id:   214 , name: '   Complex and Reflective music     '  , kind: 0,  css: 'node-optional'    },
        { id:   215 , name: '   Upbeat and Conventional music    '  , kind: 0,  css: 'node-optional'    },
        { id:   216 , name: '   Value Power  '  , kind: 0,  css: 'node-optional'    },
        { id:   217 , name: '   Value Achievement    '  , kind: 0,  css: 'node-optional'    },
        { id:   218 , name: '   Value Hedonism   '  , kind: 0,  css: 'node-optional'    },
        { id:   219 , name: '   Value Stimulation    '  , kind: 0,  css: 'node-optional'    },
        { id:   220 , name: '   Value Self-direction     '  , kind: 0,  css: 'node-optional  node-factor'    },
        { id:   221 , name: '   Value Universalism   '  , kind: 0,  css: 'node-optional'    },
        { id:   222 , name: '   Value Benevolence    '  , kind: 0,  css: 'node-optional'    },
        { id:   223 , name: '   Value Tradition  '  , kind: 0,  css: 'node-optional  node-factor'    },
        { id:   224 , name: '   Value Conformity     '  , kind: 0,  css: 'node-optional'    },
        { id:   225 , name: '   Value Security   '  , kind: 0,  css: 'node-optional'    },
        { id:   226 , name: '   Prevention   '  , kind: 0,  css: 'node-optional'    },
        { id:   227 , name: '   Promotion    '  , kind: 0,  css: 'node-optional'    },
        { id:   228 , name: '   Physiological needs  '  , kind: 0,  css: 'node-optional'    },
        { id:   229 , name: '   Need for Safety  '  , kind: 0,  css: 'node-optional'    },
        { id:   230 , name: '   Social need  '  , kind: 0,  css: 'node-optional'    },
        { id:   231 , name: '   Need for Esteem  '  , kind: 0,  css: 'node-optional'    },
        { id:   232 , name: '   Need for Self-actualisation  '  , kind: 0,  css: 'node-optional  node-factor'    },



// END FROM EXCEL



        
    ];




    var links = [
// CAREER so far
 {source:   0   , target:   1   , value: 0,         },
{source:    1   , target:   2   , value: 0,         },
{source:    2   , target:   3   , value: 0,         },
{source:    3   , target:   4   , value: 0,         },
{source:    4   , target:   7   , value: 0,         },
{source:    5   , target:   4   , value: 0,      option: true   },
{source:    6   , target:   4   , value: 0,      option: true   },
{source:    7   , target:   8   , value: 0,         },
{source:    8   , target:   9   , value: 0,         },
{source:    9   , target:   13  , value: 0,         },
{source:    10  , target:   8   , value: 0,      option: true   },
{source:    11  , target:   8   , value: 0,      option: true   },
{source:    12  , target:   8   , value: 0,      option: true   },
{source:    13  , target:   14  , value: 0,         },
{source:    14  , target:   15  , value: 0,         },
{source:    15  , target:   16  , value: 0,         },
{source:    16  , target:   17  , value: 0,         },
{source:    17  , target:   28  , value: 0,         },
{source:    18  , target:   16  , value: 0,      option: true   },
{source:    19  , target:   16  , value: 0,      option: true   },
{source:    20  , target:   16  , value: 0,      option: true   },
{source:    21  , target:   16  , value: 0,      option: true   },
{source:    22  , target:   17  , value: 0,      option: true   },
{source:    23  , target:   17  , value: 0,      option: true   },
{source:    24  , target:   17  , value: 0,      option: true   },
{source:    25  , target:   17  , value: 0,      option: true   },
{source:    26  , target:   17  , value: 0,      option: true   },
{source:    27  , target:   17  , value: 0,      option: true   },
{source:    28  , target:   29  , value: 0,         },
// RELATIONSHPS so far
        {source: 30, target: 31, value: 1},
        {source: 31, target: 32, value: 1},
        {source: 32, target: 33, value: 1},
        {source: 33, target: 34, value: 1},
        {source: 34, target: 35, value: 1},
        {source: 35, target: 36, value: 1},
        {source: 36, target: 37, value: 1},
        {source: 37, target: 38, value: 1},
        {source: 38, target: 39, value: 1},
       {source: 39, target: 40, value: 1},
        {source: 40, target: 41, value: 1},
        {source: 41, target: 42, value: 1},
        {source: 42, target: 43, value: 1},
        {source: 43, target: 44, value: 1},
// RELATIONSHPS options now
        {source: 45, target: 44, value: 1, option: true},
        {source: 46, target: 44, value: 1, option: true},
        {source: 47, target: 44, value: 1, option: true},
        {source: 48, target: 44, value: 1, option: true},
        {source: 48, target: 44, value: 1, option: true},

// BRIDGES ACROSS STRANDS                       
{source:    7  , target:   38   , value: 0,      option: true   },
{source:    41  , target:   15  , value: 0,      option: true   },


//  LINKS FROM EXCEL
        {source:    65  , target:   55  , value: 0,      option: true   },  //  pers
        {source:    66  , target:   55  , value: 0,      option: true   },
        {source:    67  , target:   55  , value: 0,      option: true   },
        {source:    68  , target:   55  , value: 0,      option: true   },
        {source:    69  , target:   55  , value: 0,      option: true   },
        {source:    70  , target:   55  , value: 0,      option: true   },
        {source:    71  , target:   55  , value: 0,      option: true   },
        {source:    72  , target:   55  , value: 0,      option: true   },
        {source:    73  , target:   56  , value: 0,      option: true   },  // cognit
        {source:    74  , target:   56  , value: 0,      option: true   },
        {source:    75  , target:   56  , value: 0,      option: true   },
        {source:    76  , target:   56  , value: 0,      option: true   },
        {source:    77  , target:   56  , value: 0,      option: true   },
        {source:    78  , target:   57  , value: 0,      option: true   },  // demog
        {source:    79  , target:   57  , value: 0,      option: true   },
        {source:    80  , target:   58  , value: 0,      option: true   },  // behav
        {source:    81  , target:   58  , value: 0,      option: true   },
        {source:    82  , target:   59  , value: 0,      option: true   },  // emot
        {source:    83  , target:   60  , value: 0,      option: true   },  // abilities
        {source:    84  , target:   60  , value: 0,      option: true   },
        {source:    85  , target:   61  , value: 0,      option: true   },  // dev
        {source:    86  , target:   61  , value: 0,      option: true   },  
        {source:    87  , target:   62  , value: 0,      option: true   },  // interests
        {source:    88  , target:   62  , value: 0,      option: true   },  
        {source:    89  , target:   63  , value: 0,      option: true   },  // att
        {source:    90  , target:   64  , value: 0,      option: true   },  // needs
        {source:    91  , target:   64  , value: 0,      option: true   },  
        {source:    92  , target:   65  , value: 0,      option: true   },
        {source:    93  , target:   65  , value: 0,      option: true   },
        {source:    94  , target:   65  , value: 0,      option: true   },
        {source:    95  , target:   65  , value: 0,      option: true   },
        {source:    96  , target:   65  , value: 0,      option: true   },
        {source:    97  , target:   96  , value: 0,      option: true   },
        {source:    98  , target:   96  , value: 0,      option: true   },
        {source:    99  , target:   96  , value: 0,      option: true   },
        {source:    100 , target:   96  , value: 0,      option: true   },
        {source:    101 , target:   96  , value: 0,      option: true   },
        {source:    102 , target:   96  , value: 0,      option: true   },
        {source:    103 , target:   94  , value: 0,      option: true   },
        {source:    104 , target:   94  , value: 0,      option: true   },
        {source:    105 , target:   94  , value: 0,      option: true   },
        {source:    106 , target:   94  , value: 0,      option: true   },
        {source:    107 , target:   94  , value: 0,      option: true   },
        {source:    108 , target:   94  , value: 0,      option: true   },
        {source:    109 , target:   92  , value: 0,      option: true   },
        {source:    110 , target:   92  , value: 0,      option: true   },
        {source:    111 , target:   92  , value: 0,      option: true   },
        {source:    112 , target:   92  , value: 0,      option: true   },
        {source:    113 , target:   92  , value: 0,      option: true   },
        {source:    114 , target:   92  , value: 0,      option: true   },
        {source:    115 , target:   95  , value: 0,      option: true   },
        {source:    116 , target:   95  , value: 0,      option: true   },
        {source:    117 , target:   95  , value: 0,      option: true   },
        {source:    118 , target:   95  , value: 0,      option: true   },
        {source:    119 , target:   95  , value: 0,      option: true   },
        {source:    120 , target:   95  , value: 0,      option: true   },
        {source:    121 , target:   93  , value: 0,      option: true   },
        {source:    122 , target:   93  , value: 0,      option: true   },
        {source:    123 , target:   93  , value: 0,      option: true   },
        {source:    124 , target:   93  , value: 0,      option: true   },
        {source:    125 , target:   93  , value: 0,      option: true   },
        {source:    126 , target:   93  , value: 0,      option: true   },
        {source:    127 , target:   67  , value: 0,      option: true   },
        {source:    128 , target:   67  , value: 0,      option: true   },
        {source:    129 , target:   67  , value: 0,      option: true   },
        {source:    130 , target:   67  , value: 0,      option: true   },
        {source:    131 , target:   67  , value: 0,      option: true   },
        {source:    132 , target:   67  , value: 0,      option: true   },
        {source:    133 , target:   67  , value: 0,      option: true   },
        {source:    134 , target:   67  , value: 0,      option: true   },
        {source:    135 , target:   67  , value: 0,      option: true   },
        {source:    136 , target:   68  , value: 0,      option: true   },
        {source:    137 , target:   68  , value: 0,      option: true   },
        {source:    138 , target:   69  , value: 0,      option: true   },
        {source:    139 , target:   69  , value: 0,      option: true   },
        {source:    140 , target:   70  , value: 0,      option: true   },
        {source:    141 , target:   70  , value: 0,      option: true   },
        {source:    142 , target:   70  , value: 0,      option: true   },
        {source:    143 , target:   71  , value: 0,      option: true   },
        {source:    144 , target:   71  , value: 0,      option: true   },
        {source:    145 , target:   71  , value: 0,      option: true   },
        {source:    146 , target:   71  , value: 0,      option: true   },
        {source:    147 , target:   72  , value: 0,      option: true   },
        {source:    148 , target:   73  , value: 0,      option: true   },
        {source:    149 , target:   73  , value: 0,      option: true   },
        {source:    150 , target:   74  , value: 0,      option: true   },
        {source:    151 , target:   75  , value: 0,      option: true   },
        {source:    152 , target:   75  , value: 0,      option: true   },
        {source:    153 , target:   76  , value: 0,      option: true   },
        {source:    154 , target:   76  , value: 0,      option: true   },
        {source:    155 , target:   76  , value: 0,      option: true   },
        {source:    156 , target:   77  , value: 0,      option: true   },
        {source:    157 , target:   77  , value: 0,      option: true   },
        {source:    158 , target:   77  , value: 0,      option: true   },
        {source:    159 , target:   78  , value: 0,      option: true   },
        {source:    160 , target:   78  , value: 0,      option: true   },
        {source:    161 , target:   78  , value: 0,      option: true   },
        {source:    162 , target:   78  , value: 0,      option: true   },
        {source:    163 , target:   78  , value: 0,      option: true   },
        {source:    164 , target:   78  , value: 0,      option: true   },
        {source:    165 , target:   78  , value: 0,      option: true   },
        {source:    166 , target:   78  , value: 0,      option: true   },
        {source:    167 , target:   79  , value: 0,      option: true   },
        {source:    168 , target:   79  , value: 0,      option: true   },
        {source:    169 , target:   79  , value: 0,      option: true   },
        {source:    170 , target:   79  , value: 0,      option: true   },
        {source:    171 , target:   79  , value: 0,      option: true   },
        {source:    172 , target:   79  , value: 0,      option: true   },
        {source:    173 , target:   79  , value: 0,      option: true   },
        {source:    174 , target:   79  , value: 0,      option: true   },
        {source:    175 , target:   80  , value: 0,      option: true   },
        {source:    176 , target:   80  , value: 0,      option: true   },
        {source:    177 , target:   80  , value: 0,      option: true   },
        {source:    178 , target:   80  , value: 0,      option: true   },
        {source:    179 , target:   81  , value: 0,      option: true   },
        {source:    180 , target:   81  , value: 0,      option: true   },
        {source:    181 , target:   81  , value: 0,      option: true   },
        {source:    182 , target:   82  , value: 0,      option: true   },
        {source:    183 , target:   82  , value: 0,      option: true   },
        {source:    184 , target:   82  , value: 0,      option: true   },
        {source:    185 , target:   82  , value: 0,      option: true   },
        {source:    186 , target:   82  , value: 0,      option: true   },
        {source:    187 , target:   82  , value: 0,      option: true   },
        {source:    188 , target:   82  , value: 0,      option: true   },
        {source:    189 , target:   83  , value: 0,      option: true   },
        {source:    190 , target:   83  , value: 0,      option: true   },
        {source:    191 , target:   83  , value: 0,      option: true   },
        {source:    192 , target:   83  , value: 0,      option: true   },
        {source:    193 , target:   83  , value: 0,      option: true   },
        {source:    194 , target:   83  , value: 0,      option: true   },
        {source:    195 , target:   83  , value: 0,      option: true   },
        {source:    196 , target:   84  , value: 0,      option: true   },
        {source:    197 , target:   84  , value: 0,      option: true   },
        {source:    198 , target:   84  , value: 0,      option: true   },
        {source:    199 , target:   85  , value: 0,      option: true   },
        {source:    200 , target:   85  , value: 0,      option: true   },
        {source:    201 , target:   85  , value: 0,      option: true   },
        {source:    202 , target:   86  , value: 0,      option: true   },
        {source:    203 , target:   86  , value: 0,      option: true   },
        {source:    204 , target:   86  , value: 0,      option: true   },
        {source:    205 , target:   86  , value: 0,      option: true   },
        {source:    206 , target:   87  , value: 0,      option: true   },
        {source:    207 , target:   87  , value: 0,      option: true   },
        {source:    208 , target:   87  , value: 0,      option: true   },
        {source:    209 , target:   87  , value: 0,      option: true   },
        {source:    210 , target:   87  , value: 0,      option: true   },
        {source:    211 , target:   87  , value: 0,      option: true   },
        {source:    212 , target:   88  , value: 0,      option: true   },
        {source:    213 , target:   88  , value: 0,      option: true   },
        {source:    214 , target:   88  , value: 0,      option: true   },
        {source:    215 , target:   88  , value: 0,      option: true   },
        {source:    216 , target:   89  , value: 0,      option: true   },
        {source:    217 , target:   89  , value: 0,      option: true   },
        {source:    218 , target:   89  , value: 0,      option: true   },
        {source:    219 , target:   89  , value: 0,      option: true   },
        {source:    220 , target:   89  , value: 0,      option: true   },
        {source:    221 , target:   89  , value: 0,      option: true   },
        {source:    222 , target:   89  , value: 0,      option: true   },
        {source:    223 , target:   89  , value: 0,      option: true   },
        {source:    224 , target:   89  , value: 0,      option: true   },
        {source:    225 , target:   89  , value: 0,      option: true   },
        {source:    226 , target:   90  , value: 0,      option: true   },
        {source:    227 , target:   90  , value: 0,      option: true   },
        {source:    228 , target:   91  , value: 0,      option: true   },
        {source:    229 , target:   91  , value: 0,      option: true   },
        {source:    230 , target:   91  , value: 0,      option: true   },
        {source:    231 , target:   91  , value: 0,      option: true   },
        {source:    232 , target:   91  , value: 0,      option: true   },




//  END FROM EXCEL

    ];

    var weakLinks = [
       // {source: 12, target: 41, value: 1},
        
    ];

    var domFuncs = (function(){

        var moreInfo,
            moreInfoHeader,
            moreInfoBody;

        var init = function(){
            moreInfo = document.querySelector('.more-info');
            moreInfoHeader = document.querySelector('.more-info_header');
            moreInfoBody = document.querySelector('.more-info_body');
        };


        var update = function(options) {
            if (isSelectingSomething) {
                hide();
                return;
            }
            moreInfo.style.display = 'block';
            moreInfo.style.top = options.y + 'px';
            moreInfo.style.left = options.x + 'px';
            moreInfoHeader.textContent = options.header;
            moreInfoBody.textContent = options.description;
        };

        var hide = function(){
            moreInfo.style.display = 'none';
        };

        init();
        return {
            init: init,
            update: update,
            hide: hide
        };
    })();

    var transitionTime = 300;



    var settings = {},
        actions = {
            isMouseDown: false
        },
        svg,
        svgGroups = {},
        svgNodes,
        svgLines,
        svgWeakLines;


    var prepareNodes = function(){
        var previousNode;

        nodes.forEach(function(node){

            if (previousNode && !!!node.isBeingDragged){
                var px = previousNode.x;
                var py = previousNode.y;
                var angle = node.angle;

                var nx = (Math.cos(angle * (Math.PI /180)) * node.distance) + px;
                var ny = (Math.sin(angle * (Math.PI/180)) * node.distance) + py;

                node.x = nx;
                node.y = ny;

            }

            previousNode = node;

        });
    };


    prepareNodes();


    return {
        controller: function ($scope, $element) {
            // GRAPH USER INTERACTIONS

            var straightenLine = function(){
                console.log('about to straightenLine', force);
                // we stop the force field
                force.stop();

                var workWithNodesId = 3;

                var mapedNodes = nodes.filter(function(node){
                    var check1 = node.kind === workWithNodesId;
                    return check1;
                });

                console.log('maped nodes?', mapedNodes);
                // create a scale
                var x = d3.scale.linear()
                    .range([40, settings.width])
                    .domain([0, mapedNodes.length]);



                mapedNodes.forEach(function(node, index){
                    node.x = x(index);
                    node.y = 480 - index;
                });

                buildGraph(false);
            };

            window.straightenLine = straightenLine;

            // END GRAPH USER INTERACTIOSN


            var normalizeNodes = function(){
                var previousNode;
                nodes.forEach(function(node){
                    if (node.isBeingDragged){
                        node.isBeingDragged = undefined;

                        var deltaX = node.x - previousNode.x;
                        var deltaY = node.y - previousNode.y;


                        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                        var angleInDegrees = Math.atan2(deltaY,  deltaX) * 180 / Math.PI;

                        var roundedAngle = Math.round(angleInDegrees / 45) * 45;

                        node.angle = roundedAngle;

                        node.distance = distance;

                    }

                    previousNode = node;
                });
                prepareNodes();
                buildNodes();
                buildLines();
            };


            var prepareActions = function(){

                var currentNode,
                    currentX,
                    currentY,
                    targetNode,
                    isAddingNode = false;

                actions.mouseOut = function(){
                    domFuncs.hide();
                };


                actions.mouseDown = function(e, d, a){
                    actions.isMouseDown = true;
                    currentNode = e;
                };

                actions.mouseDownAlt = function(){
                    hideNodes();
                    actions.isMouseDown = true;
                    currentNode = nodes[nodes.length-1];
                    isAddingNode = true;
                    targetNode = addNode();
                    targetNode.x = currentX;
                    targetNode.y = currentY;
                    targetNode.isBeingDragged = true;
                    actionUpdate();
                    normalizeNodes();
                    buildNodes();
                    buildLines();
                };

                actions.mouseUp = function(e){
                    if (!actions.isMouseDown) { return; }

                    // var coords = d3.mouse(svgGroups.actions[0][0]);
                    // currentX = coords[0];
                    // currentY = coords[1];

                    actions.isMouseDown = false;

                    // if (e.name !== undefined && !isAddingNode){
                    //     popNodes(e);
                    // } else if (optionsForNewNode.indexOf(e) !== -1){
                    //     targetNode = addNode();
                    //     targetNode.x = currentX;
                    //     targetNode.y = currentY;
                    //     buildNodes();
                    //     buildLines();
                    // }

                    isAddingNode = false;
                    // normalizeNodes();
                    targetNode = undefined;
                };

                actions.mouseMove = function(e){
                    var coords = d3.mouse(svgGroups.actions[0][0]);
                    currentX = coords[0];
                    currentY = coords[1];

                    if (e && e.name){
                        domFuncs.update({
                            header: e.name,
                            description: e.description,
                            x: currentX,
                            y: currentY
                        });
                    }

                };

                var actionUpdate = function(){
                    if (actions.isMouseDown) {
                        if (targetNode){
                            targetNode.x = currentX;
                            targetNode.y = currentY;
                            buildNodes();
                            buildLines();
                        }
                    }
                };

                d3.timer(actionUpdate, 16);

            };

            var addNode = function(){
                var newNode = {
                    name: 'node4',
                    angle: 0,
                    isBeingDragged: true,
                    distance: 100
                };

                nodes.push(newNode);

                links.push({
                    source: nodes.length - 1,
                    target: nodes.length -2,
                    value: 1
                });

                prepareNodes();
                buildGraph();

                return newNode;
            };


            var updateSettings = function(){
                settings.width = window.innerWidth;
                settings.height = window.innerHeight;
            };

            var buildGradients = function(){

                svgGroups.defs = svg.append('svg:defs');
                var buildGradient = function(name, colour1, colour2){

                    var gradient = svgGroups.defs
                        .append('svg:linearGradient')
                        .attr('id', name)
                        .attr('x1', '100%')
                        .attr('y1', '0%')
                        .attr('x2', '0%')
                        .attr('y2', '0%')
                        .attr('spreadMethod', 'pad');

                    gradient.append('svg:stop')
                        .attr('offset', '0%')
                        .attr('stop-color', colour1)
                        .attr('stop-opacity', 1);

                    gradient.append('svg:stop')
                        .attr('offset', '100%')
                        .attr('stop-color', colour2)
                        .attr('stop-opacity', 1);


                };

                kindNodes.forEach(function(kindSource){
                    kindNodes.forEach(function(kindTarget){
                        var sourceName = kindSource.name.toLowerCase();
                        var targetName = kindTarget.name.toLowerCase();
                        buildGradient(sourceName+'-'+targetName, kindSource.color, kindTarget.color);
                    });
                });
                buildGradient('test', '#FFF', '#000');
            };

            var force, drag;
            var buildScales = function(){

                var tick = function(e) {
                    // console.log('e', e);
                    svgLines.attr('x1', function(d) { return d.source.x; })
                        .attr('y1', function(d) { return d.source.y; })
                        .attr('x2', function(d) { return d.target.x; })
                        .attr('y2', function(d) { return d.target.y; });

                    svgWeakLines
                        .attr('x1', function(d) {
                            return nodes[d.source].x;
                            // return d.source.x;
                        })
                        .attr('y1', function(d) {
                            return nodes[d.source].y;
                        })
                        .attr('x2', function(d) {
                            return nodes[d.target].x;
                        })
                        .attr('y2', function(d) {
                            return nodes[d.target].y;
                        });

                    svgNodes.attr('cx', function(d) { return d.x; })
                        .attr('cy', function(d) { return d.y; });
                };



                force = d3.layout.force()
                    .size([settings.width, settings.height])
                    .charge(-200) //aled - originaly -400
                    .linkDistance(60) 
                    .on('tick', tick);

                drag = force.drag();

                force
                    .nodes(nodes)
                    .links(links)
                    .start();

            };

            var buildNodes = function(){

                svgNodes = svgGroups.nodes.selectAll('.node')
                    .data(nodes);

                //creation
                svgNodes
                    .enter()
                    .append('circle')
                    .attr('class', function(node){
                        console.log('node', node);
                        return 'node node-'+kindNodes[node.kind].name.toLowerCase()+ ' ' +node.css;
                    })
                    .on('mouseout', actions.mouseOut)
                    .on('mousedown', actions.mouseDown)
                    .on('mousemove', actions.mouseMove)
                    .on('mouseup', actions.mouseUp)
                    .call(drag);

                // remove
                svgNodes
                    .exit()
                    .remove();

                var transitionDuration = (actions.isMouseDown) ? 0 : transitionTime;


                svgNodes
                    .transition()
                    .duration(transitionDuration)
                    .attr('cx', function(d){
                        return d.x;
                    })
                    .attr('cy', function(d){
                        return d.y;
                    })
                    .attr('r', 10);

            };


            var hideNodes = function(){
                var svgNodesPop = svgGroups.nodes.selectAll('.node-pop');

                svgNodesPop
                    .transition()
                    .duration(300)
                    .attr('opacity', 0)
                    .remove();
            };

            var buildLines = function(){
                svgLines = svgGroups.lines.selectAll('.line')
                    .data(links);

                var transitionDuration = (actions.isMouseDown) ? 0 : transitionTime;

                // line creation
                svgLines
                    .enter()
                    .append('line')
                    .attr('class', function(d){
                        var extraCss = '';
                        if (d.option) {
                            extraCss += ' line-option';
                        }
                        return 'line' + extraCss;
                    })
                    .attr('stroke', function(d){
                        var sourceKind = kindNodes[d.source.kind].name.toLowerCase();
                        var targetKind = kindNodes[d.target.kind].name.toLowerCase();
                        return 'url(#'+sourceKind+'-'+targetKind+')';
                    });

                // line removing
                svgLines
                    .exit()
                    .remove();

                svgLines
                    .transition()
                    .duration(transitionDuration)
                    .attr('x1', function(d) {
                        console.log('d', d);
                        return d.source.x;
                        return nodes[d.source.id].x;
                    })
                    .attr('y1', function(d) {
                        return d.source.y;
                        return nodes[d.source.id].y;
                    })
                    .attr('x2', function(d) {
                        return d.target.x;
                        return nodes[d.target].x;
                    })
                    .attr('y2', function(d) {
                        return d.target.y;
                        return nodes[d.target].y;
                    });
                svgWeakLines = svgGroups.lines.selectAll('.line-weak')
                    .data(weakLinks);

                svgWeakLines
                    .enter()
                    .append('line')
                    .attr('class', 'line-weak line')
                    .attr('stroke', function(d){
                        var sourceKind = kindNodes[nodes[d.source].kind].name.toLowerCase();
                        var targetKind = kindNodes[nodes[d.target].kind].name.toLowerCase();
                        return 'url(#'+sourceKind+'-'+targetKind+')';
                    });



                // svgLines
                //     .transition()
                //     .duration(transitionDuration)
                //     .attr('x1', function(d){
                //         return nodes[d.source].x;
                //     })
                //     .attr('y1', function(d){
                //         return nodes[d.source].y;
                //     })
                //     .attr('x2', function(d){
                //         return nodes[d.target].x;
                //     })
                //     .attr('y2', function(d){
                //         return nodes[d.target].y;
                //     });

            };


            var buildGraph = function(triggerForce){
                triggerForce = (triggerForce === undefined) ? true : triggerForce;
                updateSettings();

                svg = svg || d3.select($element[0]).append('svg')
                    .attr('class', 'graph-behavior-time')
                    .attr('width', settings.width)
                    .attr('height', settings.height);

                svgGroups.actions = svgGroups.actions || svg.append('g')
                    .attr('class', 'actions')
                    .append('rect')
                    .attr('width', settings.width)
                    .attr('height', settings.height)
                    .attr('fill', 'rgba(0,0,0,0)')
                    .on('mousemove', actions.mouseMove)
                    .on('mouseup', actions.mouseUp);

                svgGroups.lines = svgGroups.lines || svg.append('g')
                    .attr('class', 'lines');

                svgGroups.nodes = svgGroups.nodes || svg.append('g')
                    .attr('class', 'nodes');

                if (triggerForce){
                    buildScales();
                }
                buildGradients();
                buildLines();
                buildNodes();

            };
            prepareActions();
            buildGraph();

        },
        scope: true
    };
});