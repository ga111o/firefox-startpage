import React, { useState, useEffect } from "react";

function DidCommitToday({ username }) {
  const [didCommit, setDidCommit] = useState(null);
  const token = "TOKEN";

  useEffect(() => {
    const fetchRepos = async () => {
      const reposUrl = `https://api.github.com/users/${username}/repos`;

      try {
        const reposResponse = await fetch(reposUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!reposResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const repos = await reposResponse.json();
        return repos;
      } catch (error) {
        console.error("Error fetching repos: ", error);
      }
    };

    const checkCommits = async () => {
      const repos = await fetchRepos();
      if (!repos) return;

      let foundCommit = false; // 커밋 찾았는지 여부
      const today = new Date().toISOString().slice(0, 10); // UTC 기준 오늘 날짜

      for (const repo of repos) {
        // 모든 브랜치 검사
        const branchesUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/branches`;

        try {
          const branchesResponse = await fetch(branchesUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!branchesResponse.ok) {
            throw new Error("Network response was not ok");
          }

          const branches = await branchesResponse.json();

          for (const branch of branches) {
            const commitsUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?sha=${branch.name}&per_page=1`;

            const commitsResponse = await fetch(commitsUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!commitsResponse.ok) {
              throw new Error("Network response was not ok");
            }

            const [latestCommit] = await commitsResponse.json();
            if (latestCommit) {
              const commitDate = latestCommit.commit.author.date.slice(0, 10); // YYYY-MM-DD 형식

              if (commitDate === today) {
                setDidCommit("Yes");
                foundCommit = true;
                break;
              }
            }
          }

          if (foundCommit) {
            break;
          }
        } catch (error) {
          console.error(
            `Error fetching branches or commits for ${repo.name}: `,
            error
          );
        }
      }

      if (!foundCommit) {
        setDidCommit("No");
      }
    };

    checkCommits();
  }, [username]);

  if (didCommit === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Did {username} commit today?</h3>
      <p>{didCommit}</p>
    </div>
  );
}

export default DidCommitToday;
