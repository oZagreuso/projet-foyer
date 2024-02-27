<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use App\Repository\BenevoleRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BenevoleRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(uriTemplate:"/benevoles"),
        new Get(uriTemplate:"/benevoles/{id}"),
        new Post(uriTemplate:"/benevoles"),
        new Patch(uriTemplate:"/benevoles/{id}"),
        new Delete(uriTemplate:"/benevoles/{id}")
    ]
)]
class Benevole
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 120)]
    private ?string $nom = null;

    #[ORM\Column(length: 120)]
    private ?string $prenom = null;

    #[ORM\Column(length: 15)]
    private ?string $telephone = null;

    #[ORM\Column(length: 120, nullable: true)]
    private ?string $poste = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(string $telephone): static
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getPoste(): ?string
    {
        return $this->poste;
    }

    public function setPoste(?string $poste): static
    {
        $this->poste = $poste;

        return $this;
    }
}
